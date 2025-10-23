import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { loginRequest, loginResponse } from "src/interfaces";

export class LoginRequestDto implements loginRequest {
   @IsString()
   @IsNotEmpty()
   user_login: string

   @IsString()
   @IsNotEmpty()
   user_password: string
}
export class LoginResponseDto implements loginResponse {
   @IsString()
   @IsNotEmpty()
   message: string

   @IsNumber()
   @IsNotEmpty()
   status: number

   @IsString()
   @IsNotEmpty()
   access_token: string

   @IsString()
   @IsNotEmpty()
   @IsOptional()
   refresh_token?: string

   @IsString()
   @IsNotEmpty()
   hash: string
}