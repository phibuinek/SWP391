import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMongoId,
  IsDate,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer"; // Dùng để chuyển đổi kiểu cho Date
import { Priority, Status } from "../schemas/volunteer-task.schema"; // Import các enum Priority và Status
import { ApiProperty } from "@nestjs/swagger";

export class CreateVolunteerTaskDto {
  @IsNotEmpty()
  @IsMongoId() 
  @ApiProperty({
    example: "",
  })
  assignedTo: string;

  @IsNotEmpty()
  @IsMongoId() 
  @ApiProperty({
    example: "",
  })
  assignedBy: string;

  @IsNotEmpty()
  @IsString() 
  @ApiProperty({
    example: "",
  })
  taskDescription: string;

  @IsDate() 
  @Type(() => Date)
  @ApiProperty({
    example: "",
  })
  dueDate?: Date;

  @IsOptional()
  @IsEnum(Priority) 
  @ApiProperty({
    example: "LOW",
  })
  priority?: Priority;
}
