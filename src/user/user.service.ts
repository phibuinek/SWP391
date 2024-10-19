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
        },
        {
          name: 'shelter staff',
          email: 'shelterstaff@gmail.com',
          password: deafaultPassword,
          role: Role.SHELTER_STAFF,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
        },
        {
          name: 'volunteer',
          email: 'volunteer@gmail.com',
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
        },
        {
          name: 'customer',
          email: 'customer@gmail.com',
          password: deafaultPassword,
          role: Role.CUSTOMER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
        },
      ]);
      console.log("Sample users created!")
    }else{
      console.log("Sample users data already existed!")
    }
  }
}
