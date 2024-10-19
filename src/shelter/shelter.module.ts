import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shelter, ShelterSchema } from "./schemas/shelter.schema";
import { ShelterController } from "./shelter.controller";
import { ShelterService } from "./shelter.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Shelter.name, schema: ShelterSchema }])],
    controllers: [ShelterController],
    providers: [ShelterService],
    exports: [MongooseModule],
})
export class ShelterModule{}
