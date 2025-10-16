export interface loginRequest {
   user_login: string,
   user_password: string,
   access_token:string,
   hash: string
} 

export interface loginResponse {
   message: string,
   status: number,
   access_token: string,
   refresh_token?: string,
   hash: string
}