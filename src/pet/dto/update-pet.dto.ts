import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePetDto {
    @ApiProperty({ example: 'https://example.com/image.jpg' })
    @IsString()
    image: string;

    @ApiProperty({ example: 'Milo' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'A friendly dog.' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'Brown' })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({ example: 'Labrador' })
    @IsString()
    breed: string;

    @ApiProperty({ example: "male" })
    @IsString()
    gender: string;

    @ApiProperty({ example: 'Rescue from the street.' })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({example: true})
    @IsOptional()
    isVacinted: boolean;

    @ApiProperty({example: true})
    @IsOptional()
    isVerified: boolean;

    @ApiProperty({example: true})
    @IsOptional()
    isAdopted: boolean;
}
