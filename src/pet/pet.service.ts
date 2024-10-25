import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { Pet, PetDocument } from "./schemas/pet.schema";
import { DeliveryStatus } from "./enums/delivery-status.enum";
import { PetStatus } from "./enums/pet-status.enum";
import { UpdateDeliveryStatusDTO } from "./dto/update-delivery-status.dto";
import { Shelter, ShelterDocument } from "src/shelter/schemas/shelter.schema";
import { error } from "console";
import { User, UserDocument } from "src/auth/schemas/user.schema";

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
    @InjectModel(Shelter.name)
    private readonly shelterModel: Model<ShelterDocument>,
  ) {}
  async onModuleInit() {
    const pets = await this.petModel.find().exec(); // Lấy tất cả pet

    if (pets.length === 0) {
      const shelterLocationDefault = await this.shelterModel
        .findOne({ Location: "Location A" })
        .exec();
      await this.petModel.create([
        {
          shelterId: shelterLocationDefault,
          image:
            "data:image/jpeg;base64,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",
          name: "Buddy",
          description: "A friendly dog.",
          color: "Brown",
          breed: "Labrador",
          age: 3,
          gender: "female",
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
          shelterId: shelterLocationDefault,
          image:
            "data:image/jpeg;base64,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",
          name: "Whiskers",
          description: "A cute cat.",
          color: "Black",
          breed: "Siamese",
          age: 2,
          gender: "male",
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
    const shelter = await this.shelterModel.findOne({
      Location: createPetDto.shelterLocation,
    });
    if (!shelter) {
      throw new Error("Shelter not found with the provided location");
    }
    createPetDto.shelterLocation = shelter._id.toString();
    const newPet = new this.petModel({
      ...createPetDto,
      shelterId: shelter._id,
    });
    console.error(error);
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

  async findByColor(colorSearch: string): Promise<Pet[]> {
    const pets = await this.petModel
      .find({ color: { $regex: new RegExp(colorSearch, "i") } })
      .exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No pets found with color: ${colorSearch}`);
    }
    return pets;
  }

  async findByBreed(breedSearch: string): Promise<Pet[]> {
    const pets = await this.petModel
      .find({ breed: { $regex: new RegExp(breedSearch, "i") } })
      .exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No  pets found with breed: ${breedSearch}`);
    }
    return pets;
  }

  async findByAge(ageSearch: number): Promise<Pet[]> {
    const pets = await this.petModel.find({ age: ageSearch }).exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No pet found with age: ${ageSearch}`);
    }
    return pets;
  }

  async viewPetAdoptable(): Promise<Pet[]> {
    const pets = await this.petModel.find({ isAdopted: false }).exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No adoptable pet found`);
    }
    return pets;
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
