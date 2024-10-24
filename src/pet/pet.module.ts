import { Module } from "@nestjs/common";
import { PetService } from "./pet.service";
import { PetController } from "./pet.controller";
import { Pet, PetSchema } from "./schemas/pet.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ShelterModule } from "src/shelter/shelter.module";
import { UserModule } from "src/user/user.module";
import { NotificationModule } from "src/notification/notification.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]), // Đăng ký model Pet
    ShelterModule,
    UserModule,
    NotificationModule,
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
