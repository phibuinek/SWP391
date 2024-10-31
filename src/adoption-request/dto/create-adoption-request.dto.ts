import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AdoptionStatus } from '../enums/adoption-status.enum';

export class CreateAdoptionRequestDto {
    @IsNotEmpty()
    @ApiProperty({ example: '' }) 
    petId: string;

    @IsNotEmpty()
    @ApiProperty({ example: '' }) 
    userId: string;

    @IsDate()
    @Type(() => Date) 
    @ApiProperty({ example: '2024-10-03T12:00:00Z' }) 
    requestDate?: Date;

    @IsString()
    @ApiProperty({ example: 'Looking forward to adopting this pet.' })
    comment?: string;
}
