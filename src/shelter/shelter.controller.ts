import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Shelter } from "./schemas/shelter.schema";
import { ShelterService } from "./shelter.service";
import { CreateShelterDto } from "./dto/create-shelter.dto";
import { UpdateShelterDto } from "./dto/update-shelter.dto";

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
    constructor(private readonly shelterService: ShelterService) {}

    @Get('view-all')
    async getAllShelters(): Promise<Shelter[]> {
        return this.shelterService.getAllShelters();
    }

    @Post('create')
    async createShelter(@Body() createShetlterDto: CreateShelterDto): Promise<Shelter>{
        return this.shelterService.createShelter(createShetlterDto);
    }

    @Put('update/:shelterId')
    async udpateShelter(@Param("shelterId") shelterId: string, @Body() updateShelterDto: UpdateShelterDto): Promise<Shelter>{
        return this.shelterService.updateShelter(shelterId, updateShelterDto);
    }

    @Put('delete/:shelterId')
    async deleteShelter(@Param("shelterId") shelterId: string): Promise<Shelter>{
        return this.shelterService.deleteShelter(shelterId);
    }
}