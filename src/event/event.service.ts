import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Event, EventDocument, EventStatus } from "./schemas/event.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/auth/schemas/user.schema";
import { CreateEventDto } from "./dto/create-event.dto";
import { create } from "domain";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JoinEventDto } from "./dto/join-event.dto";
import { UpdateStatusDto } from "./dto/udpate-status.dto";
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<EventDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const newEvent = new this.eventModel(createEventDto);
        return newEvent.save();
    }

    async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        const updateEvent = await this.eventModel.findOneAndUpdate(
            { _id: id, eventStatus: EventStatus.SCHEDULED },
            updateEventDto,
            { new: true },
        );
        if (!updateEvent) {
            throw new NotFoundException(`Event can't update when ongoing or deleted`);
        }
        return updateEvent;
    }

    async viewAll(): Promise<Event[]> {
        const events = await this.eventModel.find({ eventStatus: { $ne: EventStatus.CANCELLED } });
        if (!events) {
            throw new NotFoundException(`There are no events currently running or scheduled.`)
        }
        return events;
    }

    async viewOne(id: string): Promise<Event> {
        const event = await this.eventModel.findOne({ _id: id, eventStatus: { $ne: EventStatus.CANCELLED } });
        if (!event) {
            throw new NotFoundException(`Not found event with id ${id}`);
        }
        return event;
    }

    async viewEventJoined(userId: string): Promise<Event[]> {
        const joinedEvent = await this.eventModel.find({ participants: userId });
        if (!joinedEvent) {
            throw new NotFoundException(`You have never joined any event`);
        }
        return joinedEvent;
    }

    async viewEventSupported(userId: string): Promise<Event[]> {
        const supportEvent = await this.eventModel.find({ supporters: userId });
        if (!supportEvent) {
            throw new NotFoundException(`You have never support any event`);
        }
        return supportEvent;
    }

    async delete(id: string): Promise<Event> {
        const event = await this.eventModel.findOneAndUpdate(
            { _id: id, eventStatus: { $ne: EventStatus.CANCELLED } },
            { eventStatus: EventStatus.CANCELLED },
            { new: true },
        );
        if (!event) {
            throw new NotFoundException(`Not found event with id ${id}`);
        }
        return event;
    }

    async joinEvent(joinEventDto: JoinEventDto): Promise<Event> {
        const user = await this.userModel.findOne({ _id: joinEventDto.userId });
        if (!user) {
            throw new NotFoundException(`Account not found`);
        }
        const joinEvent = await this.eventModel.findOneAndUpdate(
            { _id: joinEventDto.eventId, eventStatus: EventStatus.ON_GOING },
            { $addToSet: { participants: joinEventDto.userId } },
            { new: true },
        ).exec();
        if (!joinEvent) {
            throw new NotFoundException(`Event Not On Going`);
        }
        return joinEvent;
    }

    async supportEvent(joinEventDto: JoinEventDto): Promise<Event> {
        const user = await this.userModel.findOne({ _id: joinEventDto.userId, role: Role.VOLUNTEER });
        if (!user) {
            throw new NotFoundException(`Only Volunteer can support event`);
        }
        const supportEvent = await this.eventModel.findOneAndUpdate(
            { _id: joinEventDto.eventId },
            { $addToSet: { supporters: joinEventDto.userId } },
            { new: true },
        );
        if (!supportEvent) {
            throw new NotFoundException(`Event Not On Going`);
        }
        return supportEvent;
    }

    async updateEventStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<Event> {
        const event = await this.eventModel.findOneAndUpdate(
            { _id: id, eventStatus: { $ne: EventStatus.CANCELLED } },
            { eventStatus: updateStatusDto.eventStatus },
            { new: true },
        )
        if (!event) {
            throw new NotFoundException(`Can't Update Event Deleted`);
        }
        return event;
    }

    async viewEventByStatus(status: EventStatus): Promise<Event[]> {
        if (!Object.values(EventStatus).includes(status)) {
            throw new BadRequestException(`Invalid event status: ${status}`);
        }
        const event = await this.eventModel.find({ eventStatus: status });
        if (event.length === 0) {
            throw new NotFoundException(`Not found event ${status}`);
        }
        return event;
    }

}