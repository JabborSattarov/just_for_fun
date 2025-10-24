export type SendLoginPasswordType = {
   user_firstname:string,
   user_lastname:string,
   email: string,
   login: string,
   password: string,
   message: string,
}

export type SendCodeType= {
   email: string
   user_firstname: string,
   user_lastname: string,
   code: string,
   message: string,
}