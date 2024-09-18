import { AuthService } from "./auth.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post("/signup")
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authSerivce.signUp(signUpDto);
  }
  @Get("/login")
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authSerivce.login(loginDto);
  }
}
