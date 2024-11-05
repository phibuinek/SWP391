import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum TransactionType {
  DONATION = 'DONATION',
  ADOPTION_FEE = 'ADOPTION_FEE',
  REFUND = 'REFUND',
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ type: String, enum: TransactionType, required: true })
  type: TransactionType;

  @Prop({ type: String, enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Prop()
  description: string;

  @Prop()
  paymentMethod: string;

  @Prop()
  paymentId: string;

  @Prop({ type: Types.ObjectId, ref: 'Pet' })
  petId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AdoptionRequest' })
  adoptionRequestId?: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);