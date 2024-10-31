import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User" })
  receiver: Types.ObjectId;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ type: String })
  type: string;

  @Prop({ type: String })
  role: string;

  @Prop({ type: Object })
  details: any;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
