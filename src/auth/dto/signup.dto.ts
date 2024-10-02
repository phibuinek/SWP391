import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class SignUpDto {
  @ApiProperty({
    description: 'Tên người dùng',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter correct email" })
  readonly email: string;

  @ApiProperty({
    description: 'Mật khẩu người dùng, tối thiểu 6 ký tự',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    description: 'Danh sách vai trò của người dùng, nếu có',
    example: ['customers'],
    required: false, 
    type: [String],
  })
  @IsOptional()
  readonly role: string[];
}
