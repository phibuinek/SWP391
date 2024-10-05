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
    @Prop()
    ShelterCode: String;

    @Prop()
    Location: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    ManagedBy: User;

    @Prop()
    Phone: String;

    @Prop()
    Email: String;

    @Prop()
    Quanity: Integer;

    @Prop()
    Capacity: Integer;

    @Prop()
    Availble: Integer;

    @Prop({
        type: String,
        enum: ShelterStatus,
        default: ShelterStatus.AVAILABLE,
    })
    Status: ShelterStatus
}
export const ShelterSchema = SchemaFactory.createForClass(Shelter);