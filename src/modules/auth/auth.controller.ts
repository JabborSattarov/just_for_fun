import { Body, Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { CheckAuthCodeRequestDto, LoginRequestDto, LoginResponseDto, SendAuthCodeRequestDto } from "./dto";
import { SendAuthCodeResponseInterface } from "src/interfaces";

@Controller("auth")
export class authController {
   readonly #_service: authService;
   constructor(service: authService) {
      this.#_service = service
   }

   @Post("login")
   async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
         return this.#_service.login(body);
   }

   @Post("send-code")
   async sendAuthCode ( @Body() body: SendAuthCodeRequestDto) : Promise<SendAuthCodeResponseInterface> {
      return this.#_service.sendAuthCode(body)
   }

   @Post("check-code")
   async checkAuthCode ( @Body() body: CheckAuthCodeRequestDto): Promise<unknown>{
      return this.#_service.checkAuthCode(body)
   }
   // @Post("reset-login-password")
   // async resetLoginPassword (@Body() body: ResetLoginPasswordRequestDto) : Promise<ResetLoginPasswordResponseInterface> {
   //    return this.#_service.resetLoginPassword(body)
   // }
}