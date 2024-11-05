import { Body, Controller, Get, Param, Post, Req, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheckService } from "./health-check.service";
import { CreateHealthCheckDto } from "./dto/create-health-check.dto";
import { HealthCheck } from "./schemas/health-check.schema";
import { ObjectId } from "mongoose";

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
    constructor(private readonly healthCheckService: HealthCheckService) {
    }

    @Post('create/:petId')
    async createHealthCheck(@Param('petId') petId: string, @Body() createHealthCheckDto: CreateHealthCheckDto) {
        createHealthCheckDto.petId = petId;
        createHealthCheckDto.checkingDate = new Date();
        return this.healthCheckService.createHealthCheck(createHealthCheckDto);
    }

    @Get('pet/:petId')
    async viewHealthChecksByPetId(@Param('petId') petId: string): Promise<HealthCheck[]> {
        return this.healthCheckService.viewHealthChecksByPetId(petId);
    }

    @Get('checkingBy/:checkingBy')
    async viewHealthChecksByCheckingBy(@Param('checkingBy') checkingBy: string): Promise<HealthCheck[]>{
        return this.healthCheckService.viewHealthCheckByCheckingBy(checkingBy);
    }

}