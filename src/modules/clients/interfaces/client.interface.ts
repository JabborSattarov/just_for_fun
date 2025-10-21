export interface ClientCreateRequest {
   user_firstname: string,
   user_lastname: string,
   user_phone:string,
   user_email: string,
   role: string
}

export interface ClientCreateResponse {
   status:number,
   message:string,
   access_token:string,
   hash:string
}
