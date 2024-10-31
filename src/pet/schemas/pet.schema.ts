import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { DeliveryStatus } from "../enums/delivery-status.enum";
import { PetStatus } from "../enums/pet-status.enum";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { DataZone } from "aws-sdk";

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true })
  shelterId: mongoose.Schema.Types.ObjectId;

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

  @Prop({required: true})
  gender: string;

  @Prop({default: false})
  isVacinted: boolean;

  @Prop({required: false, default: false})
  isVerified: boolean;

  @Prop({ type: String, enum: DeliveryStatus, default: DeliveryStatus.INPROCESS })
  deliveryStatus: DeliveryStatus;


  @Prop({ required: false, default: false })
  isAdopted: boolean;

  @Prop()
  note?: string;

  @Prop({ required: false, default: () => {
    const now = new Date();
    now.setHours(now.getHours() + 7);
    return now;
}})
  rescueDate: Date;

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
