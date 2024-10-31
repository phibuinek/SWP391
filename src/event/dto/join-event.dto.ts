import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class JoinEventDto{
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({
        example: ""
    })
    eventId: string;

    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({
        example: ""
    })
    userId: string;
}

