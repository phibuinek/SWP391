import { IsString, IsNumber, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DeliveryStatus } from "../enums/delivery-status.enum";
import { PetStatus } from "../enums/pet-status.enum";

export class CreatePetDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  shelterId?: number;

  @ApiProperty({ example: "PET123" })
  @IsString()
  petCode: string;

  @ApiProperty({ example: "https://example.com/image.jpg" })
  @IsString()
  image: string;

  @ApiProperty({ example: "Milo" })
  @IsString()
  name: string;

  @ApiProperty({ example: "A friendly dog." })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "Brown" })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: "Labrador" })
  @IsString()
  breed: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  age: number;

  @ApiProperty({ example: true })
  @IsOptional()
  isVacinted?: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ example: DeliveryStatus.PENDING })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus?: DeliveryStatus = DeliveryStatus.PENDING;

  @ApiProperty({ example: false })
  @IsOptional()
  isAdopted?: boolean = false;

  @ApiProperty({ example: "Rescue from the street." })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ example: "60e6b8e2f1a2b93f68f87c6d" }) // Ví dụ về ObjectId của User
  @IsString()
  rescueBy: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  rescueFee: number;

  @ApiProperty({ example: "Park" })
  @IsString()
  locationFound: string;

  @ApiProperty({ example: PetStatus.AVAILABLE })
  @IsEnum(PetStatus)
  petStatus?: PetStatus = PetStatus.AVAILABLE;
}
