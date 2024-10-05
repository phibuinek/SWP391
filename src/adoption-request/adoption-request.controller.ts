import { Controller, Post, Body, Get, Param, Put } from "@nestjs/common";
import { AdoptionRequestService } from "./adoption-request.service";
import { CreateAdoptionRequestDto } from "./dto/create-adoption-request.dto";
import { ApiTags } from "@nestjs/swagger";
import { AdoptionStatus } from "./enums/adoption-status.enum";
import { UpdateStatusDto } from "./dto/update-status.dto";

@ApiTags("adoption-requests")
@Controller("adoption-requests")
export class AdoptionRequestController {
  constructor(
    private readonly adoptionRequestService: AdoptionRequestService,
  ) {}

  @Post("create")
  async createAdoptionRequest(
    @Body() createAdoptionRequestDto: CreateAdoptionRequestDto,
  ) {
    return this.adoptionRequestService.createAdoptionRequest(
      createAdoptionRequestDto,
    );
  }

  @Get("find-by-pet/:petId") // Đường dẫn để tìm kiếm theo petId
  async findByPetId(@Param("petId") petId: string) {
    return this.adoptionRequestService.findByPetId(petId);
  }

  @Put("update-status/:id")
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.adoptionRequestService.updateStatus(id, updateStatusDto);
  }
}
