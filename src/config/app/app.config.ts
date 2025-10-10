import { registerAs } from "@nestjs/config";

interface AppConfig {
   host: string;
   port: number
}


export const appConfig = registerAs("app" , (): AppConfig => ({
   host: process.env.APP_HOST ? String(process.env.APP_HOST) : 'localhost',
   port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 9000
}))