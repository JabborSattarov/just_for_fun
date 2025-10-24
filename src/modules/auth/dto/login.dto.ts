import { IsEmail, isEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, isString, IsString } from "class-validator"
import { CheckAuthCodeRequestInterface, CheckAuthCodeResponseInterface, loginRequestInterface, loginResponseInterface, SendAuthCodeRequestInterface, SendAuthCodeResponseInterface } from "src/interfaces";

export class LoginRequestDto implements loginRequestInterface {
   @IsString()
   @IsNotEmpty()
   user_login: string

   @IsString()
   @IsNotEmpty()
   user_password: string
}
export class LoginResponseDto implements loginResponseInterface {
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

export class SendAuthCodeRequestDto implements SendAuthCodeRequestInterface {
   @IsEmail()
   @IsNotEmpty()
   email: string;
}

export class SendAuthCodeResponseDto implements SendAuthCodeResponseInterface {
   @IsString()
   message: string
}

export class CheckAuthCodeRequestDto implements CheckAuthCodeRequestInterface {
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsString()
   @IsNotEmpty()
   code: string
}
export class CheckAuthCodeResponseDto implements CheckAuthCodeResponseInterface {
   @IsString()
   @IsNotEmpty()
   message: string;
}

// export class ResetLoginPasswordRequestDto implements ResetLoginPasswordRequestInterface {
//    @IsString()
//    @IsNotEmpty()
//    code: string;
// }

// export class ResetLoginPasswordResponseDto implements ResetLoginPasswordResponseInterface {
//    @IsString()
//    @IsNotEmpty()
//    message:string;
 
//    @IsString()
//    @IsNotEmpty()
//    login: string;

//    @IsString()
//    @IsNotEmpty()
//    password: string;
// }