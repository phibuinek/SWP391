import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ShelterStatus } from "../enums/shelter.enum";
import { CreateShelterDto } from "./create-shelter.dto";

export class UpdateShelterDto extends CreateShelterDto{
   
}