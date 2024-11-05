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
import { UserService } from "src/user/user.service";

@Injectable()
export class EventService {
    constructor(
        private userService: UserService,
        @InjectModel(Event.name) private eventModel: Model<EventDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }
    async onModuleInit() {
        await this.userService.onModuleInit();
        const start = new Date();
        const end = start.setHours(start.getHours() + 7);
        const existingEvent = await this.eventModel.find().exec();
        const supporterA = await this.userModel.findOne({ email: "volunteerA@gmail.com" }).exec()
        const supporterB = await this.userModel.findOne({ email: "volunteerB@gmail.com" }).exec()
        if (existingEvent.length === 0) {
            await this.eventModel.create([
                {
                    title: "Event Adoption",
                    description: "An event for people who have adopted pets to meet and introduce adoptable farm pets.",
                    image: "https://media.istockphoto.com/id/1268042802/vi/vec-to/minh-h%E1%BB%8Da-nh%E1%BA%ADn-nu%C3%B4i-th%C3%BA-c%C6%B0ng.jpg?s=612x612&w=0&k=20&c=VdfVRfL1y-jozmIn1lm9unM3h4d35fhMk2URsMCa8f0=",
                    start: start,
                    end: end,
                    location: "736/27A, CMT8, P.5, Q.TanBinh, TpHcm",
                    eventStatus: EventStatus.ON_GOING,
                    participants: [],
                    supporters: [supporterA._id, supporterB._id],
                },
                {
                    title: "Puppy Playdate",
                    description: "A fun event for pet owners and their pups to play and socialize.",
                    image: "https://media.istockphoto.com/id/1354958134/vi/vec-to/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-h%E1%BA%A1nh-ph%C3%BAc-%C3%B4m-ch%C3%B3-th%E1%BB%83-hi%E1%BB%87n-t%C3%ACnh-y%C3%AAu-v%C3%A0-s%E1%BB%B1-ch%C4%83m-s%C3%B3c.jpg?s=2048x2048&w=is&k=20&c=xJ4XOmk2fxJyseUya9aevLZ7M8Jib2b2mp5Qc-BOXOM=",
                    start: new Date("2024-11-15T10:00:00"),
                    end: new Date("2024-11-15T12:00:00"),
                    location: "Central Park, 5th Ave, New York, NY",
                    eventStatus: EventStatus.SCHEDULED,
                    participants: [],
                    supporters: [supporterA._id, supporterB._id],
                },
                {
                    title: "Cat Adoption Day",
                    description: "A meet-and-greet event for adoptable cats and potential pet owners.",
                    image: "https://media.istockphoto.com/id/1019950792/vi/vec-to/con-m%C3%A8o-t%C3%B2-m%C3%B2-vui-t%C6%B0%C6%A1i-trong-m%E1%BB%99t-h%E1%BB%99p-c%C3%A1c-t%C3%B4ng-k%C3%A9o-ra-b%C3%A0n-ch%C3%A2n-c%E1%BB%A7a-m%C3%ACnh-nh%C3%ACn-ra-kh%E1%BB%8Fi-n%C6%A1i-%E1%BA%A9n.jpg?s=612x612&w=0&k=20&c=JgIbJL3nlayV2JaPwGZqbkg-H1NotE0AcEFg73FrPyM=",
                    start: new Date("2024-10-20T09:00:00"),
                    end: new Date("2024-10-20T15:00:00"),
                    location: "Pet Haven Shelter, 222 Main St, Springfield",
                    eventStatus: EventStatus.COMPLETED,
                    participants: [],
                    supporters: [supporterA._id, supporterB._id],
                  },
            ]);
            console.log("Event example is create!")

        }
    }
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