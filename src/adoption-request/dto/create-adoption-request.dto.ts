import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AdoptionStatus } from '../enums/adoption-status.enum';

export class CreateAdoptionRequestDto {
    @IsNotEmpty()
    @ApiProperty({ example: '60c72b2f9b1e8e4f0dce45b6' }) 
    petId: string;

    @IsNotEmpty()
    @ApiProperty({ example: '60c72b2f9b1e8e4f0dce45b7' }) 
    userId: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date) // Chuyển đổi thành đối tượng Date
    @ApiProperty({ example: '2024-10-03T12:00:00Z' }) 
    requestDate?: Date;

    @IsOptional()
    @ApiProperty({ example: '60c72b2f9b1e8e4f0dce45b8' })
    reviewBy?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Looking forward to adopting this pet.' })
    comment?: string;

    @IsOptional()
    @Type(() => Date) // Chuyển đổi thành đối tượng Date
    @ApiProperty({ example: '2024-10-05T12:00:00Z' })
    adoptionDate?: Date;

    @IsOptional()
    @ApiProperty({ example: 'PENDING' })
    status?: AdoptionStatus;
}
