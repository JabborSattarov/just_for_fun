import { Body, Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { LoginRequestDto, LoginResponseDto } from "./dto";

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
}