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

@ApiTags("Pet")
@Controller("pet")
export class PetController {
  constructor(private readonly petService: PetService) {}

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

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.petService.remove(id);
  }

  @Put("update-delivery-status/:petId")
  async updateDeliveryStatus(
    @Param("petId") petId: string,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDTO,
  ) {
    return this.petService.updateDeliveryStatus(petId, updateDeliveryStatusDto);
  }
}
