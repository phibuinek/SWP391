import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsMongoId,
} from "class-validator";

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: ""
  })
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: ""
  })
  petId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "web sieu hay"
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({
    example: 5
  })
  rating: number;
}
