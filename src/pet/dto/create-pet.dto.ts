import { IsString, IsNumber, IsOptional, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus } from '../enums/delivery-status.enum';
import { PetStatus } from '../enums/pet-status.enum';
import { Type } from 'class-transformer';

export class CreatePetDto {
  @ApiProperty({ example: "Location A" })
  @IsOptional()
  @IsString()
  shelterLocation: string;

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

  @ApiProperty({example: "male"})
  @IsString()
  gender: string;

  @ApiProperty({ example: 'Rescue from the street.' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({example: '6710ceed287697ec4b88b615'}) 
  @IsString()
  @IsOptional()
  rescueBy: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  rescueFee: number;

  @ApiProperty({ example: 'Park' })
  @IsString()
  locationFound: string;
}
