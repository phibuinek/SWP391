import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import * as mongoose from "mongoose";
import { UserService } from "./user.service";
import {
  configureUserSchema,
  User,
  UserSchema,
} from "src/auth/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (connection: mongoose.Connection) => {
          configureUserSchema(connection); // Gọi hàm để cấu hình auto-increment cho ID
          return UserSchema;
        },
        inject: [mongoose.Connection], // Inject kết nối mongoose
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
