import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shelter, ShelterSchema } from "./schemas/shelter.schema";
import { ShelterController } from "./shelter.controller";
import { ShelterService } from "./shelter.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Shelter.name, schema: ShelterSchema }]),
        UserModule,
    ],
    controllers: [ShelterController],
    providers: [ShelterService],
    exports: [MongooseModule, ShelterService],
})
export class ShelterModule{}
