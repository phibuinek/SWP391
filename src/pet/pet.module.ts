import { Module } from "@nestjs/common";
import { PetService } from "./pet.service";
import { PetController } from "./pet.controller";
import { Pet, PetSchema } from "./schemas/pet.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]), // Đăng ký model Pet
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
