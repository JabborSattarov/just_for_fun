import { Controller, Post, Req } from "@nestjs/common";
import { RefershTokenService } from "./refresh-token.service";
import { CustomeRequestInterface } from "src/interfaces/token.interface";
import { loginResponse } from "src/interfaces";

@Controller()
export class RefreshTokenController {
   constructor(private readonly refresh_service: RefershTokenService) {}
   @Post("/refresh")
   async refresh (@Req() req: CustomeRequestInterface): Promise<loginResponse> {
      
      return this.refresh_service.refresh(req)
   }
}