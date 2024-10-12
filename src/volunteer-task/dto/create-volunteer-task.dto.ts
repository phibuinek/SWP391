import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMongoId,
  IsDate,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { Priority, Status } from "../schemas/volunteer-task.schema"; // Đã export Priority và Status

export class CreateVolunteerTaskDto {
  @IsNotEmpty()
  @IsMongoId()
  assignedTo: string;

  @IsNotEmpty()
  @IsMongoId()
  assignedBy: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  assignedDate?: Date;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completedDate?: Date;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
