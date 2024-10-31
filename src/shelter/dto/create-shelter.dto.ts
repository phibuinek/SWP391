import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ShelterStatus } from "../enums/shelter.enum";

export class CreateShelterDto{
    @IsNotEmpty()
    @ApiProperty({
        example: "Shelter Sieu Bu",
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "Dia chi ne"
    })
    location: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "0909123455"
    })
    phone: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "shelter@gmail.com"
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 0,
    })
    available: number;
}