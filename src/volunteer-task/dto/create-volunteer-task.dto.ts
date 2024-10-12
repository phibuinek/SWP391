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

export class CreateVolunteerTaskDto {
  @IsNotEmpty()
  @IsMongoId() // Xác nhận là ObjectId hợp lệ
  assignedTo: string;

  @IsNotEmpty()
  @IsMongoId() // Xác nhận là ObjectId hợp lệ
  assignedBy: string;

  @IsOptional()
  @IsDate() // Xác nhận kiểu Date
  @Type(() => Date) // Dùng để chuyển đổi string thành Date
  assignedDate?: Date;

  @IsNotEmpty()
  @IsString() // Xác nhận mô tả công việc là chuỗi
  taskDescription: string;

  @IsOptional()
  @IsDate() // Xác nhận kiểu Date
  @Type(() => Date)
  dueDate?: Date;

  @IsOptional()
  @IsDate() // Xác nhận kiểu Date
  @Type(() => Date)
  completedDate?: Date;

  @IsOptional()
  @IsEnum(Priority) // Xác nhận giá trị thuộc Enum Priority
  priority?: Priority;

  @IsOptional()
  @IsEnum(Status) // Xác nhận giá trị thuộc Enum Status
  status?: Status;
}
