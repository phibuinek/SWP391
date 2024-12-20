import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/auth/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "src/auth/enums/role.enum";
import { AccountStatus } from "src/auth/enums/account-status.enum";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return deletedUser;
  }

  async onModuleInit() {
    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      const deafaultPassword = await bcrypt.hash('123456', 10);
      await this.userModel.create([
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: deafaultPassword,
          role: Role.ADMIN,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FAdmin.jpg?alt=media&token=6393c109-f1c6-45e5-8b96-6c672ee7a817",
        },
        {
          name: 'shelter staff',
          email: 'shelterstaff@gmail.com',
          password: deafaultPassword,
          role: Role.SHELTER_STAFF,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FshelterStaff.jpg?alt=media&token=b3fd50f3-6755-46d2-9067-7942cbcac8e5",
        },
        {
          name: 'volunteer A',
          email: 'volunteerA@gmail.com',
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FvolunteerA.jpg?alt=media&token=5e444cc0-14de-4230-91e1-f18c5bdc541b",
        },
        {
          name: 'volunteer B',
          email: 'volunteerB@gmail.com',
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FvolunteerB.jpg?alt=media&token=33a3e66e-d650-45c6-9394-6e01cfefd380",
        },
        {
          name: 'volunteer C',
          email: 'volunteerC@gmail.com',
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FvolunteerC.jpg?alt=media&token=af586895-3490-4296-8be8-8d9bfa3ff391",
        },
        {
          name: 'volunteer D',
          email: 'volunteerD@gmail.com',
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FvolunteerD.jpg?alt=media&token=ee0c6328-8e5f-491d-8d27-8dfba2eece21",
        },
        {
          name: 'customer A',
          email: 'customerA@gmail.com',
          password: deafaultPassword,
          role: Role.CUSTOMER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FcustomerA.jpg?alt=media&token=97aef002-8158-483c-a9e1-79f0ad6202e5",
        },
        {
          name: 'customer B',
          email: 'customerB@gmail.com',
          password: deafaultPassword,
          role: Role.CUSTOMER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FcustomerB.jpg?alt=media&token=0f3c9770-3676-454f-ad05-8422e016d784",
        },
        {
          name: 'customer C',
          email: 'customerC@gmail.com',
          password: deafaultPassword,
          role: Role.CUSTOMER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FcustomerC.jpg?alt=media&token=a01b3610-c99c-46c7-bdb8-d6032e7c17d0",
        },
        {
          name: 'customer D',
          email: 'customerD@gmail.com',
          password: deafaultPassword,
          role: Role.CUSTOMER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://firebasestorage.googleapis.com/v0/b/pawfunupload.firebasestorage.app/o/Avatars%2FcustomerD.jpg?alt=media&token=1593ee23-6c36-468b-87e3-380076fdcd1d",
        },
      ]);
      console.log("Sample users created!")
    }
}}
