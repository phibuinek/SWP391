import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { PetService } from "./pet.service";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";

@Controller("pet")
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post("create")
  create(@Body() createPetDto: CreatePetDto, @Req() req: any) {
    const userId = req.user.id;

    createPetDto.rescueBy = userId;
    return this.petService.create(createPetDto);
  }

  @Get("findAll")
  findAll() {
    return this.petService.findAll();
  }

  @Get("findOne/:id")
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
}
