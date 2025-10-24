import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, createDecipheriv, randomBytes } from "crypto"
import mongoose, { Model } from 'mongoose';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { Client } from 'src/schemas/clients.schemas';
import { tokenSignPayloadType, tokenVerifyPayloadType } from "src/types"
import { HashingId } from './hash-id';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exaption';



export class GenerateToken {
   constructor(
       @InjectModel(Client.name) private readonly clientSchema: Model<Client>
   ) { }

   private base64urlEncode(token: Buffer): string {
      return token.toString("base64")
         .replace(/\+/g, "-")
         .replace(/\//g, "_")
         .replace(/=+$/, "")
   }

   private createToken(payload: tokenSignPayloadType, secretKey: string) {
      const aesKey = Buffer.from(secretKey, "base64")
      
      const iv = randomBytes(12);
      const cipher = createCipheriv("aes-256-gcm", aesKey, iv);
      const jsonPayload = JSON.stringify(payload)
   
      let encripted = cipher.update(jsonPayload, "utf-8", "base64");
      encripted += cipher.final("base64");
      const authTag = cipher.getAuthTag();

      const cipherData = Buffer.concat([
         iv,
         Buffer.from(encripted, "base64"),
         authTag
      ])

      return this.base64urlEncode(cipherData);
   }

   async signPayload (payload: tokenSignPayloadType, secretKey: string, refresh: boolean = false) {
      
      const { id } = payload;
      const currentDate = new Date();

      const accessTokenTime = new Date(Date.now() + 1 * 60 * 1000).toISOString();
      const refreshTokenTime = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toISOString();

      const foundedUser = await this.clientSchema.findOne({_id: new mongoose.Types.ObjectId(id), status: true});

   
      if (!foundedUser) {
         throw new NotFoundException("", "User not found")
      }
      payload.expiryTime = accessTokenTime
      const access_token = this.createToken(payload, foundedUser.secret_key_access);
      let refresh_token = null;
      if (refresh) {
         payload.expiryTime = refreshTokenTime;
         refresh_token =  this.createToken(payload, foundedUser.secret_key_refresh)
      }

      foundedUser.token_given_time = currentDate
      await foundedUser.save();

      const hashId = new HashingId()
      const hash = hashId.encryptId(foundedUser.id, secretKey);
      return refresh ? { access_token, refresh_token, hash } : {access_token, hash}
   }

   verifyToken (token: tokenVerifyPayloadType, secretKey: string) {    
      try {
         const base64 = token
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            + '='.repeat((4 - token.length % 4) % 4);
         const decoded = Buffer.from(base64, 'base64');

         const iv = decoded.subarray(0, 12);

         const authTag = decoded.subarray(decoded.length - 16);

         const encrypted = decoded.subarray(12, decoded.length - 16);

         const aesKey = Buffer.from(secretKey, 'base64');
         const decipher = createDecipheriv('aes-256-gcm', aesKey, iv);

         decipher.setAuthTag(authTag);

         const decrypted = decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8');

         const payload: tokenSignPayloadType = JSON.parse(decrypted);

         return payload;
      } catch (error) {
         throw new UnauthorizedException(error.message, "invalid token !")
      }
     
   }
}