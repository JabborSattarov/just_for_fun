import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BadRequestException, ConflictException,  } from "src/exceptions";
import { CustomeRequestInterface } from "src/interfaces/token.interface";
import { Client } from "src/schemas/clients.schemas";
import { tokenSignPayloadType } from "src/types";
import { GenerateToken, HashingId, OneTimeCode } from "src/utils";





export class CheckTokenGuard implements CanActivate {

   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>,
      private readonly generateToken: GenerateToken,
      private readonly oneTimeCode: OneTimeCode,
   ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const request : CustomeRequestInterface = context.switchToHttp().getRequest();

      const access_token = request.headers["a_token"];
      const hash = request.headers["hash"];

     console.log(access_token)
     console.log(hash)
      
      if (!access_token || !hash) {
         throw new BadRequestException("", "access_token and hash required");
      }
      
      const hashId = new HashingId();
      const SECRET_KEY = process.env.AES_SECRET_KEY;
      
      const user_id = hashId.decryptId(hash, SECRET_KEY);
      const findUser = await this.clientSchema.findOne({_id: new mongoose.Types.ObjectId(user_id), status: true})

      if (!findUser) {
         throw new UnauthorizedException("", "invalid hash or token !")
      }

      const verifyedTokenData: tokenSignPayloadType = this.generateToken.verifyToken(access_token, findUser.secret_key_access)
      
      const currentTime = new Date();
      if (currentTime >= new Date(verifyedTokenData.expiryTime)) {
         throw new UnauthorizedException("", "token expired !");
         
      }

      findUser.secret_key_access = this.oneTimeCode.generateOneTimeCode(32);
      await findUser.save()

      request.decode = verifyedTokenData
      return true
   }
}