import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthCheck, HealthCheckSchema } from "./schemas/health-check.schema";
import { HealthCheckController } from "./health-check.controller";
import { HealthCheckService } from "./health-check.service";

@Module({
    imports: [MongooseModule.forFeature([{name: HealthCheck.name, schema: HealthCheckSchema}]), HealthCheckModule],
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
})
export class HealthCheckModule{}