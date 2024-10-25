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
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
      const deafaultPassword = await bcrypt.hash("123456", 10);
      await this.userModel.create([
        {
          name: "admin",
          email: "admin@gmail.com",
          password: deafaultPassword,
          role: Role.ADMIN,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar:
            "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/300089884_763668491521414_5770669070464097899_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s206x206&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeEegp_fJA6S8w5P-VnzB6R9f-j3MndcdHJ_6Pcyd1x0cqJDdSL0Ey8vaSNF6n3ME30Pu_eXKX6lGgNPW6fwKmnq&_nc_ohc=K_YSdP-DkioQ7kNvgHA5QYa&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AqZ8OR5pCWjU2q6-8mTY97g&oh=00_AYBBQTLyQBzooG_uH7g0TLrXEGEOZYtmGDEFUiOVeclO9Q&oe=67201C69",
        },
        {
          name: "shelter staff",
          email: "shelterstaff@gmail.com",
          password: deafaultPassword,
          role: Role.SHELTER_STAFF,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar:
            "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/437929649_1835492293588945_2302488075322328359_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHum3XATkcTCIV0A7BJdJngE2bUKFJ7qKUTZtQoUnuopdpFhmpBBJ6H_ahEGow3h96H02_RwPdBUxrbndQOdvtn&_nc_ohc=SYr8QDgKrlYQ7kNvgEp2CuI&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AS-l57NXVnl5oyxtaltzZGm&oh=00_AYCcI693vLZKPeJTzUcE0uMoy1xf_G7gxV79OueyVBDd_w&oe=67201EB3",
        },
        {
          name: "volunteer",
          email: "volunteer@gmail.com",
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar:
            "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/445408680_1137758247445768_3299612860039943629_n.jpg?stp=dst-jpg_s206x206&_nc_cat=111&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeHmwsP9vVH9JJ8pdVAGL9s4CtZusKzFUKsK1m6wrMVQq-RCqnLn8f1JQML0LKLOpHRVSvU0iKxzYOzntFaB4_uJ&_nc_ohc=HzSQCHGMMH8Q7kNvgH5bNWo&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AqaxSGAv36mW92cNU2RFQMv&oh=00_AYDhcqkd-LZL4aC65D2uRHFP5NNdFE2j01uCKuepMaqxPQ&oe=6720164F",
        },
        {
          name: "customer",
          email: "customer@gmail.com",
          password: deafaultPassword,
          role: Role.CUSTOMER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar:
            "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/462134380_864832139089773_5178661578371967629_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFXKJEEqVdA0MlN52C3D2W5WGSaJ5eJCsNYZJonl4kKw090K5o37PLARz5klhlOwy79DbRJK0JV5W5cCkBOPRhi&_nc_ohc=ra-UmIPRQBYQ7kNvgH6GJAP&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=A2eIpl98jZBKKo6Dkws5M56&oh=00_AYCpTuo9XpB3PGyp6niuOT7_DtWDh4a1a_tdUyH57S-7OQ&oe=672171EF",
        },
      ]);
      console.log("Sample users created!");
    } else {
      console.log("Sample users data already existed!");
    }
  }
}
