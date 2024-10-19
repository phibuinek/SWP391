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
    @InjectModel(Shelter.name) private readonly shelterModel: Model<ShelterDocument>,
  ) { }
  async onModuleInit() {
    const pets = await this.petModel.find().exec(); // Lấy tất cả pet

    if (pets.length === 0) {
      const shelterLocationDefault = await this.shelterModel.findOne({ Location: 'Location A' }).exec();
      await this.petModel.create([
        {
          shelterId: shelterLocationDefault,
          image: 'https://example.com/image1.jpg',
          name: 'Buddy',
          description: 'A friendly dog.',
          color: 'Brown',
          breed: 'Labrador',
          age: 3,
          gender: "female",
          isVacinted: true,
          isVerified: true,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: 'Found in the park.',
          rescueBy: 'person',
          rescueFee: 100,
          locationFound: 'City Park',
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image: 'https://example.com/image2.jpg',
          name: 'Whiskers',
          description: 'A cute cat.',
          color: 'Black',
          breed: 'Siamese',
          age: 2,
          gender: "male",
          isVacinted: false,
          isVerified: true,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: 'Rescued from the street.',
          rescueBy: 'person',
          rescueFee: 150,
          locationFound: 'Downtown',
          petStatus: PetStatus.AVAILABLE,
        },
      ]);

      console.log('Sample pets created!');
    } else {
      console.log('Sample pet data already exists.');
    }
  }
  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const shelter = await this.shelterModel.findOne({ Location: createPetDto.shelterLocation });
    if (!shelter) {
      throw new Error('Shelter not found with the provided location');
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
    const pets = await this.petModel.find({ color: { $regex: new RegExp(colorSearch, 'i') } }).exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No pets found with color: ${colorSearch}`);
    }
    return pets
  }

  async findByBreed(breedSearch: string): Promise<Pet[]> {
    const pets = await this.petModel.find({ breed: { $regex: new RegExp(breedSearch, 'i') } }).exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No  pets found with breed: ${breedSearch}`);
    }
    return pets
  }

  async findByAge(ageSearch: number): Promise<Pet[]> {
    const pets = await this.petModel.find({ age: ageSearch }).exec()
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
  async updateDeliveryStatus(petId: string, updateDeliveryStatusDto: UpdateDeliveryStatusDTO): Promise<Pet> {
    const updateDeliveryStatus = await this.petModel.findByIdAndUpdate(
      petId,
      { deliveryStatus: updateDeliveryStatusDto.deliveryStatus },
      { new: true }
    );
    if (!updateDeliveryStatus) {
      throw new NotFoundException('Pet not found');
    }
    return updateDeliveryStatus;
  }
}
