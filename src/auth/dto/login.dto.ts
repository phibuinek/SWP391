import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiResponse } from '@nestjs/swagger';


export class LoginDto {
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter correct email" })
  readonly email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng, ít nhất 6 ký tự',
    example: 'password123',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
