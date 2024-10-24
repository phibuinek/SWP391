import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { AdoptionRequestService } from "./adoption-request.service";
import { CreateAdoptionRequestDto } from "./dto/create-adoption-request.dto";
import { ApiTags } from "@nestjs/swagger";
import { AdoptionStatus } from "./enums/adoption-status.enum";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { ObjectId } from "mongoose";
import { NotificationService } from "src/notification/notification.service";

@ApiTags("adoption-requests")
@Controller("adoption-requests")
export class AdoptionRequestController {
  constructor(
    private readonly adoptionRequestService: AdoptionRequestService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post("create")
  async createAdoptionRequest(
    @Body() createAdoptionRequestDto: CreateAdoptionRequestDto,
  ) {
    // Giả sử createAdoptionRequestDto chứa thông tin cần thiết
    const { userId, petId } = createAdoptionRequestDto;

    // Gọi phương thức để tạo yêu cầu nhận nuôi
    const adoptionRequest =
      await this.adoptionRequestService.createAdoptionRequest(
        createAdoptionRequestDto,
      );

    // Gửi thông báo về yêu cầu nhận nuôi
    await this.notificationService.requestAdoption(userId, petId);

    return adoptionRequest;
  }

  @Get("find-all")
  async findAll() {
    return this.adoptionRequestService.findAll();
  }

  @Get("find-by-pet/:petId") // Đường dẫn để tìm kiếm theo petId
  async findByPetId(@Param("petId") petId: string) {
    return this.adoptionRequestService.findByPetId(petId);
  }

  @Get("find-by-user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    return this.adoptionRequestService.findByUserId(userId);
  }

  @Put("update-status/:id")
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.adoptionRequestService.updateStatus(id, updateStatusDto);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string) {
    return this.adoptionRequestService.delete(id);
  }
}
