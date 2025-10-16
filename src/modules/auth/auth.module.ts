import { Global, Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";

@Module({
   providers:[authService],
   controllers:[authController]
})
export class authModule {}