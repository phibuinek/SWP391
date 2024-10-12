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
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  petId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
