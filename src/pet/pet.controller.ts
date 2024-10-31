import { NotificationService } from "./../notification/notification.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from "@nestjs/common";
import { PetService } from "./pet.service";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { ApiTags } from "@nestjs/swagger";
import { DeliveryStatus } from "./enums/delivery-status.enum";
import { UpdateDeliveryStatusDTO } from "./dto/update-delivery-status.dto";
import { Request } from "express";

@ApiTags("Pet")
@Controller("pet")
export class PetController {
  constructor(
    private readonly petService: PetService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post("create")
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get("find-all")
  findAll() {
    return this.petService.findAll();
  }

  @Get("find-by-id/:id")
  findOne(@Param("id") id: string) {
    return this.petService.findOne(id);
  }

  @Get("find-by-color/:color")
  async findByColor(@Param("color") color: string) {
    return this.petService.findByColor(color);
  }

  @Get("find-by-breed/:breed")
  async findByBreed(@Param("breed") breed: string) {
    return this.petService.findByBreed(breed);
  }

  @Get("view-adoptable-pet")
  async viewAdoptablePet() {
    return this.petService.viewPetAdoptable();
  }

  @Get('view-by-volunteer/:volunteerId')
  async viewByVolunteer(@Param("volunteerId") volunteerId: string){
    return this.petService.viewPetByVolunteer(volunteerId);
  }

  @Put("update/:id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Put("delete/:id")
  async remove(@Param("id") petId: string,) {
    const result = await this.petService.remove(petId);
    return result;
  }

  @Put("update-delivery-status/:petId")
  async updateDeliveryStatus(
    @Param("petId") petId: string,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDTO,
  ) {
    return this.petService.updateDeliveryStatus(petId, updateDeliveryStatusDto);
  }

  @Put("update-pet-adopted/:petId")
  async udpatePetAdopted(@Param("petId") petId: string){
    return this.petService.udpatePetAdopted(petId);
  }

  @Put("update-pet-verified/:petId")
  async updatePetVerified(@Param("petId") petId: string){
    return this.petService.updatePetVerified(petId);
  }

  @Put("update-pet-vacinted/:petId")
  async udpatePetVacinted(@Param("petId") petId: string){
    return this.petService.updatePetVacinted(petId);
  }
}