import { AuthService } from "./auth.service";
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Query,
} from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    return this.authService.signUp(signUpDto);
  }
  @Post("/login")
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
  @Get("verify-email")
  async verifyEmail(@Query("token") token: string): Promise<string> {
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }
    return this.authService.verifyEmail(token);
  }
}
