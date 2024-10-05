import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { DeliveryStatus } from "../enums/delivery-status.enum";
import { PetStatus } from "../enums/pet-status.enum";

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop()
  shelterId: number;

  @Prop({ unique: true })
  petCode: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  color?: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true, min: 0, max: 30 })
  age: number;

  @Prop()
  isVacinted: boolean;

  @Prop()
  isVerified: boolean;

  @Prop({ type: String, enum: DeliveryStatus, default: DeliveryStatus.PENDING })
  deliveryStatus: DeliveryStatus;


  @Prop({ required: false, default: false })
  isAdopted: boolean;

  @Prop()
  note?: string;

  // @Prop({ required: false })
  // rescueDate: Date;

  @Prop()
  rescueBy: String;

  @Prop({ required: true })
  rescueFee: number;

  @Prop({ required: true })
  locationFound: string;

  @Prop({ type: String, enum: PetStatus, default: PetStatus.AVAILABLE })
  petStatus: PetStatus;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
