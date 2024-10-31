import { IsArray, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { EventStatus } from "../schemas/event.schema";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Event sieu hay"
    })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Event nay cuc ky hay luon"
    })
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: ""
    })
    image: string;

    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    @ApiProperty({
        example: "2024-10-26T15:49:59.970+00:00"
    })
    start: Date;

    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    @ApiProperty({
        example: "2024-10-26T15:49:59.970+00:00"
    })
    end: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Dia chi 123"
    })
    location: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ["", ""],
        type: [String]
    })
    supporters: string[];
}