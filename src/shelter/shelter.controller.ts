import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Shelter } from "./schemas/shelter.schema";
import { ShelterService } from "./shelter.service";

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
    constructor(private readonly shelterService: ShelterService) {}

    @Get('view-all')
    async getAllShelters(): Promise<Shelter[]> {
        return this.shelterService.getAllShelters();
    }
}