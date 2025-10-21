import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes } from "crypto"
import mongoose, { Model } from 'mongoose';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { Client } from 'src/schemas/clients.schemas';
import { tokenPayloadType } from "src/types"
import { HashingId } from './hash-id';


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

   private async createToken(payload: tokenPayloadType, secretKey: string) {
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

   async signPayload (payload: tokenPayloadType, secretKey: string, refresh: boolean = false) {
      
      const { id } = payload;
      const currentDate = new Date();

      const accessTokenTime = new Date(Date.now() + 1 * 60 * 1000).toISOString();
      const refreshTokenTime = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toISOString();

      const foundedUser = await this.clientSchema.findOne({_id: new mongoose.Types.ObjectId(id), status: true});

   
      if (!foundedUser) {
         throw new NotFoundException("", "User not found")
      }
      payload.expiryTime = accessTokenTime
      const accessToken = await this.createToken(payload, foundedUser.secret_key_access);
      let refreshToken = null;
      if (refresh) {
         payload.expiryTime = refreshTokenTime;
         refreshToken = await this.createToken(payload, foundedUser.secret_key_refresh)
      }

      foundedUser.token_given_time = currentDate
      await foundedUser.save();

      const hashId = new HashingId()
      const hash = hashId.encryptId(foundedUser.id, secretKey);

      return { accessToken, refreshToken, hash }
   }
}