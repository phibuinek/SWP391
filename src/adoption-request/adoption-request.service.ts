import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdoptionRequest } from "./schemas/adoption-request.schema";
import { CreateAdoptionRequestDto } from "./dto/create-adoption-request.dto";
import { AdoptionStatus } from "./enums/adoption-status.enum";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Injectable()
export class AdoptionRequestService {
  constructor(
    @InjectModel(AdoptionRequest.name)
    private readonly adoptionRequestModel: Model<AdoptionRequest>,
  ) {}

  async createAdoptionRequest(
    createAdoptionRequestDto: CreateAdoptionRequestDto,
  ): Promise<AdoptionRequest> {
    const newAdoptionRequest = new this.adoptionRequestModel(
      createAdoptionRequestDto,
    );
    return newAdoptionRequest.save(); // Lưu vào cơ sở dữ liệu
  }

  async findByPetId(petId: string): Promise<AdoptionRequest[]> {
    const adoptionRequests = await this.adoptionRequestModel.find({ petId });
    if (!adoptionRequests.length) {
      throw new NotFoundException("No adoption requests found for this pet");
    }
    return adoptionRequests;
  }
  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
  ): Promise<AdoptionRequest> {
    const updatedRequest = await this.adoptionRequestModel.findByIdAndUpdate(
      id,
      { status: updateStatusDto.status, comment: updateStatusDto.comment },
      { new: true },
    );
    if (!updatedRequest) {
      throw new NotFoundException("Adoption request not found");
    }
    return updatedRequest;
  }
}
