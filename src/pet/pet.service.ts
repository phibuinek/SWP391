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
import { ShelterService } from "src/shelter/shelter.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class PetService {
  constructor(
    private readonly shelterService: ShelterService,
    private readonly userService: UserService,
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
    @InjectModel(Shelter.name) private readonly shelterModel: Model<ShelterDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }
  async onModuleInit() {
    await this.shelterService.onModuleInit();
    await this.userService.onModuleInit();
    const pets = await this.petModel.find().exec(); // Lấy tất cả pet
    const rescueBy = await this.userModel.findOne({email: "volunteerA@gmail.com"}).exec();
    if (!rescueBy) {
      throw new Error("Volunteer with email 'volunteerA@gmail.com' not found in the database.");
    }
    const shelterLocationDefault = await this.shelterModel.findOne({ location: "Location A" });
    if (pets.length === 0) {
      
      await this.petModel.create([
        // 3 con pet volunteer tạo lúc đầu 
        {
          shelterId: shelterLocationDefault,
          image:
            "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/10/22/09/chocolate-labrador.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp",
          name: "Buddy",
          description: "A friendly dog.",
          color: "Brown",
          breed: "Labrador",
          age: 3,
          gender: "female",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: "Found in the park.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 100,
          locationFound: "City Park",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://as2.ftcdn.net/v2/jpg/05/43/91/45/1000_F_543914516_2P5Uxd5D3ZlB5AFtSmjW7vQseVmWerPD.jpg",
          name: "Whiskers",
          description: "A cute cat.",
          color: "Black",
          breed: "Siamese",
          age: 2,
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: "Rescued from the street.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 150,
          locationFound: "Downtown",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://i.ytimg.com/vi/A-XgmP5a0VQ/maxresdefault.jpg",
          name: "Luna",
          description: "A gentle and calm cat.",
          color: "Gray",
          breed: "Siberian",
          age: 4,
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.PENDING,
          isAdopted: false,
          note: "Found near the library.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 50,
          locationFound: "City Library",
          petStatus: PetStatus.AVAILABLE,
        },

        // 3 con pet đang chờ duyệt
        {
          shelterId: shelterLocationDefault,
          image:
            "https://i.ytimg.com/vi/A-XgmP5a0VQ/maxresdefault.jpg",
          name: "Snow",
          description: "A gentle and calm cat.",
          color: "White",
          breed: "Persian",
          age: 3,
          gender: "female",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.INPROCESS,
          isAdopted: false,
          note: "Found wandering near the river.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 180,
          locationFound: "Riverbank",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://dogtime.com/wp-content/uploads/sites/12/2023/09/GettyImages-164855910-1-e1694532950609.jpg?w=1024",
          name: "Max",
          description: "A playful and active dog.",
          color: "Black and White",
          breed: "Border Collie",
          age: 2,
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.INPROCESS,
          isAdopted: false,
          note: "Found wandering near the river.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 120,
          locationFound: "Riverbank",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://catinaflat.blog/wp-content/uploads/2024/02/russian-blue-cat-breed.jpg",
          name: "Bella",
          description: "A sweet and affectionate kitten.",
          color: "Gray",
          breed: "Russian Blue",
          age: 1,
          gender: "female",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.INPROCESS,
          isAdopted: false,
          note: "Abandoned in a parking lot.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 80,
          locationFound: "Mall Parking",
          petStatus: PetStatus.AVAILABLE,
        },

        // 10 con pet có thể nhận nuôi trên trang trại
        {
          shelterId: shelterLocationDefault,
          image:
            "https://cdn.shortpixel.ai/spai/w_775+q_lossy+ret_img+to_webp/betterpet.com/wp-content/uploads/2022/07/goldenretriever.jpeg",
          name: "Labubi",
          description: "Gentle and quiet, loves to snuggle.",
          color: "Cream",
          breed: "Golden Retriever",
          age: 4, 
          gender: "female",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: true,
          note: "Surrendered by owner due to relocation.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 150,
          locationFound: "City Center ",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://images.squarespace-cdn.com/content/v1/5c6494bbf4e5310e57b3de34/1623557067947-PN4CQHL8B84UEXR4K9CP/Capture.PNG?format=1500w",
          name: "Simba",
          description: "Curious and energetic kitten.",
          color: "Orange Tabby",
          breed: "Domestic Shorthair",
          age: 1, 
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: true,
          note: "Rescued from a construction site.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 90,
          locationFound: "Downtown Construction Site",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://www.animalkingdomaz.com/wp-content/uploads/Boxer.jpg",
          name: "Rocky",
          description: "Loyal and brave, perfect guard dog.",
          color: "Brindle",
          breed: "Boxer",
          age: 5, 
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: true,
          note: "Found in a rural area.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 130,
          locationFound: "Countryside",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://showsightmagazine.com/wp-content/uploads/2023/12/Angel-1.jpg",
          name: "Milo",
          description: "Friendly with everyone, loves kids.",
          color: "Brown",
          breed: "Beagle",
          age: 3, 
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: false,
          note: "Found in a local park.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 100,
          locationFound: "Community Park",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://png.pngtree.com/thumb_back/fw800/background/20220615/pngtree-tortoiseshell-persian-cat-face-tri-color-animal-photo-image_140230.jpg",
          name: "Chloe",
          description: "Calm and affectionate cat.",
          color: "Tortoiseshell",
          breed: "Persian",
          age: 6, 
          gender: "female",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: false,
          note: "Rescued from a pet hoarder.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 110,
          locationFound: "Suburban House",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://petlandbeavercreek.com/wp-content/uploads/2023/01/2017242_800.jpg",
          name: "Leo",
          description: "Playful and loves attention.",
          color: "Gray and White",
          breed: "Siberian Husky",
          age: 1, 
          gender: "male",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: false,
          note: "Found lost in the woods.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 140,
          locationFound: "Forest",
          petStatus: PetStatus.AVAILABLE,
        },
        {
          shelterId: shelterLocationDefault,
          image:
            "https://dogtime.com/wp-content/uploads/sites/12/2011/01/GettyImages-514367196-e1692032817448.jpg?resize=1200,630",
          name: "Misty",
          description: "Shy but sweet when comfortable.",
          color: "White",
          breed: "Bichon Frise",
          age: 2, 
          gender: "female",
          isVacinted: false,
          isVerified: false,
          deliveryStatus: DeliveryStatus.COMPLETED,
          isAdopted: false,
          note: "Found near an apartment complex.",
          rescueDate: Date.now(),
          rescueBy: rescueBy._id,
          rescueFee: 85,
          locationFound: "Apartment Complex",
          petStatus: PetStatus.AVAILABLE,
        },
      ]);
      console.log("Sample pets created!");
    }
  }
  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const shelter = await this.shelterModel.findOne({
      location: createPetDto.shelterLocation,
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
    return this.petModel.find({ petStatus: PetStatus.AVAILABLE }).exec();
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
      .find({ color: { $regex: new RegExp(colorSearch, "i") }, petStatus: PetStatus.AVAILABLE })
      .exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No pets found with color: ${colorSearch}`);
    }
    return pets;
  }

  async findByBreed(breedSearch: string): Promise<Pet[]> {
    const pets = await this.petModel
      .find({ breed: { $regex: new RegExp(breedSearch, "i") }, petStatus: PetStatus.AVAILABLE })
      .exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No  pets found with breed: ${breedSearch}`);
    }
    return pets;
  }

  async viewPetByVolunteer(rescueBy: string): Promise<Pet[]> {
    const pets = await this.petModel.find({ rescueBy: rescueBy, petStatus: PetStatus.AVAILABLE }).exec();
    if (!pets) {
      throw new NotFoundException(`No pet resued by this volunteer`);
    }
    return pets;
  }

  async viewPetAdoptable(): Promise<Pet[]> {
    const pets = await this.petModel.find({ isAdopted: false, petStatus: PetStatus.AVAILABLE }).exec();
    if (!pets || pets.length === 0) {
      throw new NotFoundException(`No adoptable pet found`);
    }
    return pets;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const updatedPet = await this.petModel
      .findOneAndUpdate({ _id: id, petStatus: PetStatus.AVAILABLE }, updatePetDto, { new: true })
      .exec();

    if (!updatedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }

    return updatedPet;
  }

  async remove(id: string): Promise<Pet> {
    const deletedPet = await this.petModel.findByIdAndUpdate(
      id,
      { petStatus: PetStatus.NOT_AVAILABLE },
      { new: true },
    );

    if (!deletedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }

    return deletedPet;
  }

  async updateDeliveryStatus(
    petId: string,
    updateDeliveryStatusDto: UpdateDeliveryStatusDTO,): Promise<Pet> {
    const updateDeliveryStatus = await this.petModel.findOneAndUpdate(
      { _id: petId, petStatus: PetStatus.AVAILABLE },
      { deliveryStatus: updateDeliveryStatusDto.deliveryStatus },
      { new: true },
    );
    if (!updateDeliveryStatus) {
      throw new NotFoundException("Pet not found");
    }
    return updateDeliveryStatus;
  }

  async udpatePetAdopted(petId: string) {
    const updatePetAdopted = await this.petModel.findOneAndUpdate(
      { _id: petId, petStatus: PetStatus.AVAILABLE },
      { isAdopted: true },
      { new: true }
    );
    if (!updatePetAdopted) {
      throw new NotFoundException("Pet not found");
    }
    return updatePetAdopted;
  }

  async updatePetVerified(petId: string) {
    const updatePetVerified = await this.petModel.findOneAndUpdate(
      { _id: petId, petStatus: PetStatus.AVAILABLE },
      { isVerified: true },
      { new: true },
    );
    if (!updatePetVerified) {
      throw new NotFoundException(`Pet not found`);
    }
    return updatePetVerified;
  }

  async updatePetVacinted(petId: string) {
    const updatePetVacinted = await this.petModel.findOneAndUpdate(
      { _id: petId, petStatus: PetStatus.AVAILABLE },
      { isVacinted: true },
      { new: true },
    );
    if (!updatePetVacinted) {
      throw new NotFoundException(`Pet not found`);
    }
    return updatePetVacinted;
  }
}
