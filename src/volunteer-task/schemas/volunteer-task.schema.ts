import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type VolunteerTaskDocument = VolunteerTask & Document;

export enum Priority { // Thêm `export` để export enum Priority
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum Status { // Thêm `export` để export enum Status
  PENDING = "Pending",
  IN_PROGRESS = "InProgress",
  COMPLETED = "Completed",
}

@Schema({ timestamps: true })
export class VolunteerTask {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  assignedTo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  assignedBy: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  assignedDate: Date;

  @Prop({ type: String, required: true })
  taskDescription: string;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: Date })
  completedDate: Date;

  @Prop({ type: String, enum: Priority, default: Priority.MEDIUM })
  priority: Priority;

  @Prop({ type: String, enum: Status, default: Status.PENDING })
  status: Status;
}

export const VolunteerTaskSchema = SchemaFactory.createForClass(VolunteerTask);
