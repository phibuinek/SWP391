import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { Pet, PetDocument } from "./schemas/pet.schema";

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const newPet = new this.petModel(createPetDto);
    return newPet.save();
  }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).exec();
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const updatedPet = await this.petModel
      .findByIdAndUpdate(id, updatePetDto, { new: true })
      .exec();

    if (!updatedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }

    return updatedPet;
  }

  async remove(id: string): Promise<Pet> {
    const deletedPet = await this.petModel.findByIdAndDelete(id).exec();

    if (!deletedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }

    return deletedPet;
  }
}
