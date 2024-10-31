import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/schemas/user.schema";

export type EventDocument = Event & Document;

export enum EventStatus {
    SCHEDULED = 'SCHEDULED',
    ON_GOING = 'ON_GOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({required: true})
    image: string;

    @Prop({ required: true })
    start: Date;

    @Prop({ required: true })
    end: Date;

    @Prop({ required: true })
    location: string;

    @Prop({ enum: EventStatus, default: EventStatus.SCHEDULED  })
    eventStatus: EventStatus;

    @Prop({ type: [String], ref: User.name, default: []}) // Mảng lưu trữ người tham gia
    participants: string[];

    @Prop({ type: [String], ref: User.name, default: []}) // Mảng lưu trữ người tham gia
    supporters: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
