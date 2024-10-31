import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { Feedback, FeedbackDocument, FeedbackSchema } from "./schemas/feedback.schema";
import { Pet, PetDocument } from "src/pet/schemas/pet.schema";
import { User, UserDocument } from "src/auth/schemas/user.schema";
import { PetStatus } from "src/pet/enums/pet-status.enum";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    @InjectModel(Pet.name) private petModel: Model<PetDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const user = await this.userModel.findOne({ _id: createFeedbackDto.userId });
    if (!user) {
      throw new NotFoundException(`Account not found with id ${createFeedbackDto.userId}`);
    }
    const pet = await this.petModel.findOne({ _id: createFeedbackDto.petId, petStatus: PetStatus.AVAILABLE })
    if (!pet) {
      throw new NotFoundException(`Pet not found with id ${createFeedbackDto.petId}`);
    }
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    return newFeedback.save();
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }

  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackModel.findById(id).exec();
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return feedback;
  }
  async findByPetId(petId: string): Promise<Feedback[]>{
    const feedbacks = await this.feedbackModel.find({petId});
    if(!FeedbackSchema){
      throw new NotFoundException(`Pet with id ${petId} don't have any feedback`);
    }
    return feedbacks;
  }

  async findByUserId(userId: string): Promise<Feedback[]>{
    const user = await this.userModel.findOne({_id: userId});
    if(!user){
      throw new NotFoundException(`Account not found`);
    }
    const feedbacks = await this.feedbackModel.find({userId});
    return feedbacks;
  }
  
  async update(id: string, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const updatedFeedback = await this.feedbackModel
      .findByIdAndUpdate(id, updateFeedbackDto, { new: true })
      .exec();
    if (!updatedFeedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return updatedFeedback;
  }

  async remove(id: string): Promise<void> {
    const deletedFeedback = await this.feedbackModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedFeedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }
}
