import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User, UserSchema } from "src/auth/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Đăng ký model Pet
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule {}