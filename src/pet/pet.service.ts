import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { Pet, PetDocument } from "./schemas/pet.schema";
import { DeliveryStatus } from "./enums/delivery-status.enum";
import { PetStatus } from "./enums/pet-status.enum";
import { UpdateDeliveryStatusDTO } from "./dto/update-delivery-status.dto";

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
  ) {}
  async onModuleInit() {
    const pets = await this.petModel.find().exec(); // Lấy tất cả pet

    if (pets.length === 0) {
      await this.petModel.create([
        {
          shelterId: 1,
          petCode: "PET001",
          image: "https://example.com/image1.jpg",
          name: "Buddy",
          description: "A friendly dog.",
          color: "Brown",
          breed: "Labrador",
          age: 3,
          species: 1,
          isVacinted: true,
          isVerified: true,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: "Found in the park.",
          rescueBy: "person",
          rescueFee: 100,
          locationFound: "City Park",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: 2,
          petCode: "PET002",
          image: "https://example.com/image2.jpg",
          name: "Whiskers",
          description: "A cute cat.",
          color: "Black",
          breed: "Siamese",
          age: 2,
          species: 2, // Có thể xác định loại động vật
          isVacinted: false,
          isVerified: true,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: "Rescued from the street.",
          rescueBy: "person",
          rescueFee: 150,
          locationFound: "Downtown",
          petStatus: PetStatus.AVAILABLE,
        },
      ]);

      console.log("Sample pets created!");
    } else {
      console.log("Sample pet data already exists.");
    }
  }
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
  async updateDeliveryStatus(
    petId: string,
    updateDeliveryStatusDto: UpdateDeliveryStatusDTO,
  ): Promise<Pet> {
    const updateDeliveryStatus = await this.petModel.findByIdAndUpdate(
      petId,
      { deliveryStatus: updateDeliveryStatusDto.deliveryStatus },
      { new: true },
    );
    if (!updateDeliveryStatus) {
      throw new NotFoundException("Pet not found");
    }
    return updateDeliveryStatus;
  }
}
