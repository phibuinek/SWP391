import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type VolunteerTaskDocument = VolunteerTask & Document;

enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

enum Status {
  PENDING = "Pending",
  IN_PROGRESS = "InProgress",
  COMPLETED = "Completed",
}

@Schema({ timestamps: true })
export class VolunteerTask {
  @Prop({ type: Types.ObjectId, ref: "User", required: true }) // Tham chiếu tới User (AssignedTo)
  assignedTo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true }) // Tham chiếu tới User (AssignedBy)
  assignedBy: Types.ObjectId;

  @Prop({ type: Date, default: Date.now }) // Thời gian được giao
  assignedDate: Date;

  @Prop({ type: String, required: true }) // Mô tả công việc
  taskDescription: string;

  @Prop({ type: Date }) // Ngày hết hạn
  dueDate: Date;

  @Prop({ type: Date }) // Ngày hoàn thành
  completedDate: Date;

  @Prop({ type: String, enum: Priority, default: Priority.MEDIUM }) // Mức độ ưu tiên
  priority: Priority;

  @Prop({ type: String, enum: Status, default: Status.PENDING }) // Trạng thái công việc
  status: Status;
}

export const VolunteerTaskSchema = SchemaFactory.createForClass(VolunteerTask);
