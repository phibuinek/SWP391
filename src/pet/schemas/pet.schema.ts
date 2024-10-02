import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DeliveryStatus, PetStatus } from "../dto/create-pet.dto";

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop({ required: true })
  shelterId: number;

  @Prop({ required: true, unique: true })
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

  @Prop({ required: true })
  species: number;

  @Prop({ required: true })
  isVacinted: boolean;

  @Prop({ required: true })
  isVerified: boolean;

  @Prop({ type: String, enum: DeliveryStatus, default: DeliveryStatus.PENDING })
  deliveryStatus: DeliveryStatus;

  @Prop({ required: false, default: false })
  isAdopted: boolean;

  @Prop()
  note?: string;

  @Prop({ required: false })
  rescueDate: Date;

  @Prop({ required: true })
  rescueBy: number;

  @Prop({ required: true })
  rescueFee: number;

  @Prop({ required: true })
  locationFound: string;

  @Prop({ type: String, enum: PetStatus, default: PetStatus.PENDING })
  petStatus: PetStatus;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
