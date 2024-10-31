import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Integer } from "aws-sdk/clients/apigateway";
import { User } from "src/auth/schemas/user.schema";
import mongoose from "mongoose";
import { timestamp } from "rxjs";
import { ShelterStatus } from "../enums/shelter.enum";
export type ShelterDocument = Shelter & Document;
@Schema({
    timestamps: true
})
export class Shelter{

    @Prop({unique: true})
    name: string
    
    @Prop()
    location: string;

    @Prop({unique: true})
    phone: string;

    @Prop({unique: true})
    email: string;
    
    @Prop({
        default: 0,
    })
    availble: number;

    @Prop({
        type: String,
        enum: ShelterStatus,
        default: ShelterStatus.AVAILABLE,
    })
    status: ShelterStatus
}
export const ShelterSchema = SchemaFactory.createForClass(Shelter);