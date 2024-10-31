import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { AdoptionRequest, AdoptionRequestDocument } from "./schemas/adoption-request.schema";
import { CreateAdoptionRequestDto } from "./dto/create-adoption-request.dto";
import { AdoptionStatus } from "./enums/adoption-status.enum";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { User, UserDocument } from "src/auth/schemas/user.schema";
import { Pet, PetDocument } from "src/pet/schemas/pet.schema";
import { PetStatus } from "src/pet/enums/pet-status.enum";
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class AdoptionRequestService {
  constructor(
    @InjectModel(AdoptionRequest.name) private readonly adoptionRequestModel: Model<AdoptionRequestDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
  ) { }

  async createAdoptionRequest(createAdoptionRequestDto: CreateAdoptionRequestDto,): Promise<AdoptionRequest> {
    const user = await this.userModel.findOne({ _id: createAdoptionRequestDto.userId });
    if (!user) {
      throw new NotFoundException(`Not found Customer Account with id ${createAdoptionRequestDto.userId}`);
    }
    const pet = await this.petModel.findOne({ _id: createAdoptionRequestDto.petId, petStatus: PetStatus.AVAILABLE });
    if (!pet) {
      throw new NotFoundException(`Not found Pet with id: ${createAdoptionRequestDto.petId}`);
    }
    const newAdoptionRequest = new this.adoptionRequestModel(createAdoptionRequestDto,);
    return newAdoptionRequest.save();
  }

  async findByPetId(petId: string): Promise<AdoptionRequest[]> {
    const adoptionRequests = await this.adoptionRequestModel.find({ petId, status: { $ne: AdoptionStatus.NOT_AVAILABLE } });
    if (!adoptionRequests.length) {
      throw new NotFoundException("No adoption requests found for this pet");
    }
    return adoptionRequests;
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<AdoptionRequest> {
    const shelterStaff = await this.userModel.findOne({ _id: updateStatusDto.reviewBy, role: Role.SHELTER_STAFF });
    if (!shelterStaff) {
      throw new ForbiddenException(`You don't have permission`);
    }
    if (
      updateStatusDto.status === AdoptionStatus.APPROVED ||
      updateStatusDto.status === AdoptionStatus.REJECTED
    ) {
      const updatedRequest = await this.adoptionRequestModel.findByIdAndUpdate(
        id,
        {
          reviewBy: updateStatusDto.reviewBy,
          status: updateStatusDto.status,
          comment: updateStatusDto.comment,
        },
        { new: true },
      );
      if (!updatedRequest) {
        throw new NotFoundException("Adoption request not found");
      }
      return updatedRequest;
    }
    if (updateStatusDto.status === AdoptionStatus.COMPLETED) {
      const updatedRequest = await this.adoptionRequestModel.findByIdAndUpdate(
        id,
        {
          reviewBy: updateStatusDto.reviewBy,
          status: updateStatusDto.status,
          comment: updateStatusDto.comment,
          adoptionDate: Date.now(),
        },
        { new: true },
      );
      if (!updatedRequest) {
        throw new NotFoundException("Adoption request not found");
      }
      return updatedRequest;
    }
  }

  async findAll(): Promise<AdoptionRequest[]> {
    const adoptinRequests = await this.adoptionRequestModel.find({ status: { $ne: AdoptionStatus.NOT_AVAILABLE } }).exec();
    return adoptinRequests;
  }

  async findByUserId(userId: string): Promise<AdoptionRequest[]> {
    const adoptionRequests = await this.adoptionRequestModel
      .find({ userId: userId, status: { $ne: AdoptionStatus.NOT_AVAILABLE } })
      .exec();
    return adoptionRequests;
  }

  async findByReviewBy(reviewBy: string): Promise<AdoptionRequest[]>{
    const reviewByRequests = await this.adoptionRequestModel.find({reviewBy: reviewBy, status: { $ne: AdoptionStatus.NOT_AVAILABLE }});
    if(!reviewByRequests){
      throw new NotFoundException(`You have never processed any adoption requests`);
    }
    return reviewByRequests;
  }
  async deleteAdoptionRequest(adoptionRequestId: string): Promise<AdoptionRequest> {
    const deleteAdoptionRequest = await this.adoptionRequestModel.findByIdAndUpdate(
      adoptionRequestId,
      { status: AdoptionStatus.NOT_AVAILABLE }
    );
    if (!deleteAdoptionRequest) {
      throw new NotFoundException(
        `No adoption request with id ${adoptionRequestId} not found`,
      );
    }
    return deleteAdoptionRequest;
  }
}