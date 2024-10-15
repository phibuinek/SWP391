import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import * as nodemailer from "nodemailer";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "lehuynhminhtri09082003@mail.com",
        pass: "mfsr fmdv hyzt wkir",
      },
    });

    const mailOptions = {
      from: "lehuynhminhtri09082003@mail.com",
      to: email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link: http://localhost:3000/auth/verify-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
  }
  async verifyEmail(token: string): Promise<string> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userModel.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException("Invalid token");
      }
      user.isEmailVerified = true;
      await user.save();
      return "Email verified successfully";
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { name, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      isEmailVerified: false,
    });

    const emailVerificationToken = this.jwtService.sign({ id: user._id });

    await this.sendVerificationEmail(email, emailVerificationToken);

    return { message: "Please check your email to verify your account." };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException(
        "Please verify your email before logging in",
      );
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
