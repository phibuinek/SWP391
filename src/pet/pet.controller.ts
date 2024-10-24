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
  findByColor(@Param("color") color: string) {
    return this.petService.findByColor(color);
  }

  @Get("find-by-breed/:breed")
  findByBreed(@Param("breed") breed: string) {
    return this.petService.findByBreed(breed);
  }

  @Get("find-by-age/:age")
  findByAge(@Param("age") age: number) {
    return this.petService.findByAge(age);
  }

  @Get("view-adoptable-pet")
  viewAdoptablePet() {
    return this.petService.viewPetAdoptable();
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete("delete/:id")
  async remove(
    @Param("id") petId: string,
    @Body("userId") userId: string,
    @Body("petName") petName: string,
  ) {
    // Thực hiện xóa thú cưng
    const result = await this.petService.remove(petId);

    // Kiểm tra nếu xóa thành công
    if (result) {
      // Gửi thông báo chỉ khi xóa thành công
      await this.notificationService.deletePet(userId, petId, petName);
    }

    // Trả về kết quả xóa thú cưng
    return result;
  }

  @Put("update-delivery-status/:petId")
  async updateDeliveryStatus(
    @Param("petId") petId: string,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDTO,
  ) {
    return this.petService.updateDeliveryStatus(petId, updateDeliveryStatusDto);
  }
}
