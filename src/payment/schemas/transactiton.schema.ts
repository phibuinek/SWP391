import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TransactionDocument = Transaction & Document;

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum TransactionType {
  DONATION = "DONATION",
  ADOPTION_FEE = "ADOPTION_FEE",
  REFUND = "REFUND",
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: String, required: true }) // Đổi thành String để match với ID từ frontend
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: "VND" })
  currency: string;

  @Prop({
    type: String,
    enum: Object.values(TransactionType),
    required: true,
    default: TransactionType.DONATION,
  })
  type: TransactionType;

  @Prop({
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.COMPLETED,
  })
  status: TransactionStatus;

  @Prop()
  description: string;

  @Prop({ default: "PayOS" })
  paymentMethod: string;

  @Prop({ required: true, unique: true })
  paymentId: string;

  @Prop({ type: String }) // Optional fields
  petId?: string;

  @Prop({ type: String })
  adoptionRequestId?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
