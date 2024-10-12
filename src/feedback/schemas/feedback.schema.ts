import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: Types.ObjectId, ref: "User", required: true }) // Tham chiếu tới schema User
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Pet", required: true })
  petId: Types.ObjectId;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true, min: 1, max: 5 }) // Rating giới hạn từ 1 đến 5
  rating: number;

  @Prop({ type: Date, default: Date.now })
  feedbackAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
