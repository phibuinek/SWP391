import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    // Đăng ký PassportModule với chiến lược xác thực mặc định là jwt. Passport là một middleware giúp quản lý quy
    // trình đăng nhập và xác thực, còn JWT là token xác thực được sử dụng.
    PassportModule.register({ defaultStrategy: "jwt" }),
    //JwtModule.registerAsync: Đăng ký module JWT với cấu hình bất đồng bộ
    JwtModule.registerAsync({
      inject: [ConfigService], //sử dụng ConfigService để lấy các giá trị cấu hình (ví dụ: bí mật JWT và thời gian hết hạn).
      useFactory: (config: ConfigService) => {
        //useFactory: Là một hàm nhận vào ConfigService để lấy giá trị từ các biến môi trường hoặc file cấu hình.
        return {
          secret: config.get<string>("JWT_SECRET"), //secret: Được lấy từ biến môi trường JWT_SCERET, là khóa bí mật để mã hóa JWT.
          signOptions: {
            //signOptions: Định nghĩa các tùy chọn cho việc ký JWT, trong đó có expiresIn – thời gian hết hạn của token, được lấy từ biến môi trường JWT_EXPIRES.
            expiresIn: config.get<string | number>("JWT_EXPIRES"),
          },
        };
      },
    }),
    // Tích hợp MongoDB bằng Mongoose, đăng ký collection User với schema là UserSchema.
    // Schema này định nghĩa cấu trúc dữ liệu người dùng (user) trong cơ sở dữ liệu MongoDB.
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
