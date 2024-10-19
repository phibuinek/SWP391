import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiResponse } from '@nestjs/swagger';


export class LoginDto {
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'ShelterStaff@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter correct email" })
  readonly email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng, ít nhất 6 ký tự',
    example: '123456',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
