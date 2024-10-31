import { IsEnum, IsNotEmpty } from "class-validator";
import { EventStatus } from "../schemas/event.schema";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusDto{
    @IsEnum(EventStatus)
    @IsNotEmpty()
    @ApiProperty({
        example: "ON_GOING"
    })
    eventStatus: EventStatus;
}