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


export interface CreateClientInterface extends ClientCreateRequest {
   user_login: string,
   user_password: string, 
   secret_key_access: string,
   secret_key_refresh: string,
   token_given_time? : Date
}
export interface ClientDeleteRequestInterface {
   id: string
} 