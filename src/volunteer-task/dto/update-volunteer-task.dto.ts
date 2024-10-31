import { PartialType } from '@nestjs/mapped-types';
import { CreateVolunteerTaskDto } from './create-volunteer-task.dto';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../schemas/volunteer-task.schema';

export class UpdateVolunteerTaskDto {
    @IsEnum(Status)
    @IsNotEmpty()
    @ApiProperty({
        example: "IN_PROGRESS"
    })
    status: Status;
}
