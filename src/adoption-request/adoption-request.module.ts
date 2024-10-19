import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdoptionRequest, AdoptionRequestSchema } from "./schemas/adoption-request.schema";
import { AdoptionRequestController } from "./adoption-request.controller";
import { AdoptionRequestService } from "./adoption-request.service";

@Module({
    imports: [MongooseModule.forFeature([{name: AdoptionRequest.name, schema: AdoptionRequestSchema}])],
    controllers: [AdoptionRequestController],
    providers: [AdoptionRequestService],
})
export class AdoptionRequestModule{}