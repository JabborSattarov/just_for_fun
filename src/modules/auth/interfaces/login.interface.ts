export interface loginRequest {
   user_login: string,
   user_password: string,
} 

export interface loginResponse {
   message: string,
   status: number,
   access_token: string,
   refresh_token?: string,
   hash: string
}