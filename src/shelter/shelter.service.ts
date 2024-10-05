// shelter.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelter, ShelterDocument } from './schemas/shelter.schema';
import { ShelterStatus } from './enums/shelter.enum'; // Đảm bảo import enum ShelterStatus

@Injectable()
export class ShelterService implements OnModuleInit {
    constructor(@InjectModel(Shelter.name) private readonly shelterModel: Model<ShelterDocument>) {}

    async onModuleInit() {
        const shelters = await this.shelterModel.find().exec(); 

        if (shelters.length === 0) {
            await this.shelterModel.create([
                {
                    ShelterCode: 'SHELTER001',
                    Location: 'Location A',
                    ManagedBy: '60b8d9a67a2a2c3e881b6f93',
                    Phone: '123456789',
                    Email: 'shelterA@example.com',
                    Quanity: 5,
                    Capacity: 10,
                    Availble: 5,
                    Status: ShelterStatus.AVAILABLE,
                },
                {
                    ShelterCode: 'SHELTER002',
                    Location: 'Location B',
                    ManagedBy: '60b8d9a67a2a2c3e881b6f94', 
                    Phone: '987654321',
                    Email: 'shelterB@example.com',
                    Quanity: 3,
                    Capacity: 8,
                    Availble: 3,
                    Status: ShelterStatus.AVAILABLE,
                },
                {
                    ShelterCode: 'SHELTER003',
                    Location: 'Location C',
                    ManagedBy: '60b8d9a67a2a2c3e881b6f95', 
                    Phone: '456123789',
                    Email: 'shelterC@example.com',
                    Quanity: 4,
                    Capacity: 7,
                    Availble: 4,
                    Status: ShelterStatus.AVAILABLE,
                },
                {
                    ShelterCode: 'SHELTER004',
                    Location: 'Location D',
                    ManagedBy: '60b8d9a67a2a2c3e881b6f96', 
                    Phone: '321654987',
                    Email: 'shelterD@example.com',
                    Quanity: 6,
                    Capacity: 12,
                    Availble: 6,
                    Status: ShelterStatus.AVAILABLE,
                },
                {
                    ShelterCode: 'SHELTER005',
                    Location: 'Location E',
                    ManagedBy: '60b8d9a67a2a2c3e881b6f97',
                    Phone: '159753468',
                    Email: 'shelterE@example.com',
                    Quanity: 2,
                    Capacity: 5,
                    Availble: 2,
                    Status: ShelterStatus.AVAILABLE,
                },
            ]);

            console.log('Sample shelters created!');
        } else {
            console.log('Sample shelter data already exists.');
        }
    }
    
      async getAllShelters(): Promise<Shelter[]> {
        return this.shelterModel.find().exec();
      }
}
