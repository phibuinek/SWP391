import { IsEnum } from 'class-validator';
import { AdoptionStatus } from '../enums/adoption-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
    @IsEnum(AdoptionStatus) 
    @ApiProperty({
        example: 'APPROVED',
    })
    status: AdoptionStatus;

    @ApiProperty({
        example: 'Reason why approve or reject',
    })
    comment: string;

}
