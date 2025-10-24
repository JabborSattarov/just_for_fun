
export interface loginRequestInterface {
   user_login: string,
   user_password: string,
} 

export interface loginResponseInterface {
   message: string,
   status: number,
   access_token: string,
   refresh_token?: string,
   hash: string
}


export interface SendAuthCodeRequestInterface {
   email: string
}
export interface SendAuthCodeResponseInterface {
   message: string,
}


export interface CheckAuthCodeRequestInterface {
   email: string,
   code: string,
}
export interface CheckAuthCodeResponseInterface {
   message: string,
}

// export interface ResetLoginPasswordRequestInterface {
//    code: string
// }

// export interface ResetLoginPasswordResponseInterface {
//    message: string,
//    login: string,
//    password: string,
// }
