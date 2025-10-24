
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BadRequestException } from "src/exceptions";
import { UnauthorizedException } from "src/exceptions/unauthorized.exaption";
import { loginResponseInterface } from "src/interfaces";
import { CustomeRequestInterface } from "src/interfaces/token.interface";
import { Client } from "src/schemas/clients.schemas";
import { tokenSignPayloadType } from "src/types";
import { GenerateToken, HashingId, OneTimeCode } from "src/utils";

@Injectable()
export class RefershTokenService {
   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>,
      private readonly hashId: HashingId,
      private readonly generateToken: GenerateToken,
      private readonly oneTimeCode: OneTimeCode
   ) { }

   async refresh(req: CustomeRequestInterface): Promise<loginResponseInterface> {

      const refresh_token = req.headers["r_token"]
      const hash = req.headers["hash"]


      if (!refresh_token || !hash) {
         throw new BadRequestException("", "access_token and hash required");
      }

      const SECRET_KEY = process.env.AES_SECRET_KEY;

      const user_id = this.hashId.decryptId(hash, SECRET_KEY);
      const findUser = await this.clientSchema.findOne({ _id: new mongoose.Types.ObjectId(user_id), status: true })

      if (!findUser) {
         throw new UnauthorizedException("", "invalid hash or token")
      }

      const verifyedTokenData: tokenSignPayloadType = this.generateToken.verifyToken(refresh_token, findUser.secret_key_refresh)
      const currentTime = new Date();

      console.log(verifyedTokenData)
      if (currentTime >= new Date(verifyedTokenData.expiryTime)) {
         throw new UnauthorizedException("", "token expired !");
      }

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: findUser.id, role: findUser.role }, SECERT_KEY, true)
      const response: loginResponseInterface = {
         status:200,
         message: "ok",
         ...tokens
      }
   
      
      return response

   }
}