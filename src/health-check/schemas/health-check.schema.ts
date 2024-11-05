import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Pet } from "src/pet/schemas/pet.schema";
import { HealthStatus } from "../enums/health-status.enum";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { CheckingType } from "../enums/checking-type.enum";

export type HealthCheckDocument = HealthCheck & Document;
@Schema({
    timestamps: true
})
export class HealthCheck extends Document{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Pet'})
    petId: Pet;

    @Prop({
        type: String,
        enum: HealthStatus,
    })
    healthStatus: HealthStatus;

    @Prop()
    healthStatusDescription: String;

    @Prop()
    note: string;

    @Prop()
    weight: number;

    @Prop()
    temperature: number;

    @Prop()
    checkingDate: Date;

    @Prop()
    checkingBy: string;

    @Prop({
        type: String, 
        enum: CheckingType,
        default: CheckingType.INITIAL
    })
    checkingType: CheckingType;

    @Prop({ type: Boolean, default: false })
    isOld: boolean;
}

export const HealthCheckSchema = SchemaFactory.createForClass(HealthCheck);