// shelter.service.ts
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelter, ShelterDocument } from './schemas/shelter.schema';
import { ShelterStatus } from './enums/shelter.enum'; // Đảm bảo import enum ShelterStatus
import { CreateShelterDto } from './dto/create-shelter.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateShelterDto } from './dto/update-shelter.dto';

@Injectable()
export class ShelterService implements OnModuleInit {
    constructor(@InjectModel(Shelter.name) private readonly shelterModel: Model<ShelterDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async onModuleInit() {
        const shelters = await this.shelterModel.find().exec();
        if (shelters.length === 0) {
            await this.shelterModel.create([
                {
                    name: "Shelter A",
                    location: 'Location A',
                    phone: '123456789',
                    email: 'shelterA@example.com',
                    availble: 20,
                    status: ShelterStatus.AVAILABLE,
                },
                {
                    name: "Shelter B",
                    location: 'Location B',
                    phone: '0909123456',
                    email: 'shelterB@example.com',
                    availble: 100,
                    status: ShelterStatus.AVAILABLE,
                },
                {
                    name: "Shelter C",
                    location: 'Location C',
                    phone: '0808123456',
                    email: 'shelterC@example.com',
                    availble: 50,
                    status: ShelterStatus.AVAILABLE,
                },
            ]);

            console.log('Sample shelters created!');
        } else {
            console.log('Sample shelter data already exists.');
        }
    }

    async getAllShelters(): Promise<Shelter[]> {
        return this.shelterModel.find({status: ShelterStatus.AVAILABLE}).exec();
    }

    async createShelter(createShelterDto: CreateShelterDto): Promise<Shelter> {
        const newShelter = new this.shelterModel(createShelterDto,);
        return newShelter.save();
    }

    async updateShelter(shelterId: string, updateShelterDto: UpdateShelterDto): Promise<Shelter> {
        const updateShelter = await this.shelterModel.findByIdAndUpdate(shelterId, updateShelterDto, { new: true }).exec();
        if (!updateShelter) {
            throw new NotFoundException(`Not found Shelter with id ${shelterId}`);
        }
        return updateShelter;
    }

    async deleteShelter(shelterId): Promise<Shelter> {
        const deleteShelter = await this.shelterModel.findByIdAndUpdate(shelterId,
            { status: ShelterStatus.NOT_AVAILABLE },
            { new: true }
        );
        if(!deleteShelter){
            throw new NotFoundException(`Not found shelterId with Id ${shelterId}`);
        }
        return deleteShelter;
    }
}
