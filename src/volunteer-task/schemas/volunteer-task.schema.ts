import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type VolunteerTaskDocument = VolunteerTask & Document;

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@Schema({ timestamps: true })
export class VolunteerTask {
  @Prop({ type: Types.ObjectId, ref: "User", required: true }) 
  assignedTo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true }) 
  assignedBy: Types.ObjectId;

  @Prop({
    type: Date, default: () => {
      const now = new Date();
      now.setHours(now.getHours() + 7);
      return now;
    }
  })
  assignedDate: Date;

  @Prop({ type: String, required: true }) 
  taskDescription: string;

  @Prop({ type: Date }) 
  dueDate: Date;

  @Prop({ type: Date, default: null }) 
  completedDate: Date;

  @Prop({ type: String, enum: Priority, default: Priority.MEDIUM }) 
  priority: Priority;

  @Prop({ type: String, enum: Status, default: Status.PENDING }) 
  status: Status;
}

export const VolunteerTaskSchema = SchemaFactory.createForClass(VolunteerTask);
