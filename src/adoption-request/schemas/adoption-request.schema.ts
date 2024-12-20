import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { Pet } from "src/pet/schemas/pet.schema";
import { AdoptionStatus } from "../enums/adoption-status.enum";

export type AdoptionRequestDocument = AdoptionRequest & Document;
@Schema({
    timestamps: true,
})

export class AdoptionRequest {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Pet'})
    petId: Pet;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User;

    @Prop()
    requestDate: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null})
    reviewBy: User;

    @Prop()
    comment: string;

    @Prop({default: null})
    adoptionDate: Date;

    @Prop({
        type: String,
        enum: AdoptionStatus,
        default: AdoptionStatus.PENDING,
    })
    status: AdoptionStatus;
}

export const AdoptionRequestSchema = SchemaFactory.createForClass(AdoptionRequest);
