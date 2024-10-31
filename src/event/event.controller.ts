import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JoinEventDto } from "./dto/join-event.dto";
import { UpdateStatusDto } from "./dto/udpate-status.dto";
import { EventStatus } from "src/event/schemas/event.schema";

@ApiTags('event')
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post('create')
    async create(@Body() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @Get('view-all')
    async viewAll() {
        return this.eventService.viewAll();
    }

    @Get('view-one/:id')
    async viewOne(@Param("id") id: string) {
        return this.eventService.viewOne(id);
    }

    @Get(`view-event-joined/:userId`)
    async viewEventJoined(@Param("userId") userId: string) {
        return this.eventService.viewEventJoined(userId);
    }

    @Get(`view-event-supported/:userId`)
    async viewEventSupported(@Param("userId") userId: string) {
        return this.eventService.viewEventSupported(userId);
    }

    @Get('view-event-by-status/:status')
    async viewEventByStatus(@Param("status") status: EventStatus) {
        return this.eventService.viewEventByStatus(status);
    }

    @Put('update/:id')
    async update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.update(id, updateEventDto);
    }
    @Put('join-event')
    async joinEvent(@Body() joinEventDto: JoinEventDto) {
        return this.eventService.joinEvent(joinEventDto);
    }

    @Put('support-event')
    async supportEvent(@Body() joinEventDto: JoinEventDto) {
        return this.eventService.supportEvent(joinEventDto);
    }

    @Put('update-status/:eventId')
    async updateEventStatus(@Param("eventId") eventId: string, @Body() updateStatusDto: UpdateStatusDto) {
        return this.eventService.updateEventStatus(eventId, updateStatusDto);
    }

    @Put('delete/:id')
    async delete(@Param("id") id: string) {
        return this.eventService.delete(id);
    }
}