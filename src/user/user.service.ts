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
          avatar: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/300089884_763668491521414_5770669070464097899_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s206x206&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeEegp_fJA6S8w5P-VnzB6R9f-j3MndcdHJ_6Pcyd1x0cqJDdSL0Ey8vaSNF6n3ME30Pu_eXKX6lGgNPW6fwKmnq&_nc_ohc=K_YSdP-DkioQ7kNvgHA5QYa&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AqZ8OR5pCWjU2q6-8mTY97g&oh=00_AYBBQTLyQBzooG_uH7g0TLrXEGEOZYtmGDEFUiOVeclO9Q&oe=67201C69",
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
          avatar: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/437929649_1835492293588945_2302488075322328359_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHum3XATkcTCIV0A7BJdJngE2bUKFJ7qKUTZtQoUnuopdpFhmpBBJ6H_ahEGow3h96H02_RwPdBUxrbndQOdvtn&_nc_ohc=SYr8QDgKrlYQ7kNvgEp2CuI&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AS-l57NXVnl5oyxtaltzZGm&oh=00_AYCcI693vLZKPeJTzUcE0uMoy1xf_G7gxV79OueyVBDd_w&oe=67201EB3",
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
          avatar: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/456509920_3817760355171565_7092026517832195088_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHYSGJdBh4tZp4QfwPXSS-wLwgdt6kT4rQvCB23qRPitDDrbvK0mj39vJcQhkzwslSsD4jWCzry6IXzFnabTT7D&_nc_ohc=khuWOXZgdWcQ7kNvgFzPM6T&_nc_zt=24&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AOk249ORrATRNfG6xCkSmyz&oh=00_AYBpdmoyp4SnfKMrtbY8Hdfvl90lezYBR73-X1JzxRKQgQ&oe=672575B9",
        },
        {
          name: 'volunteerB',
          email: 'volunteerB@gmail.com',
          password: deafaultPassword,
          role: Role.VOLUNTEER,
          isEmailVerified: true,
          status: AccountStatus.ACTIVE,
          address: "123 A street",
          phone: "0909123456",
          avatar: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/464737852_1231434601411465_557363368074510523_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHxceHo6WNE2NulNoSFQoOVWbvWZqHjaTdZu9ZmoeNpN_WIXy5US7mLdJp9xIpTISxYi3Ftq9vpbMXFj6sSENs-&_nc_ohc=nvxnA8xa1jgQ7kNvgFVNyq7&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=APJEgmTafZyMdOs22y3a9k0&oh=00_AYA8kcxSaBC6oezuwbeSbH_ygNWrHRFnyQP2L7a4PkRyiA&oe=672576D6",
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
          avatar: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/134153713_854781898679516_2512764112582489842_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeG0Wzg1o0RMkSxbYcGfn6k91qL_1-Wpqc7Wov_X5ampzsQFfN-voEt8TKmg06z0jVHRVRH5XB7Vpy-pqCAPnTu0&_nc_ohc=okXl4xMK4S0Q7kNvgEkr-v4&_nc_zt=24&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AjmFOJKyx27tQ3SmG4Fbdnn&oh=00_AYCWs26nFV1x0yKvsU51D7DrTLPRTSxc6LnXOJXFc2_nAg&oe=67472D1F",
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
          avatar: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/322247044_942920513743059_5950179370105293873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGaMsMUdfX8jrp4Zwlv37c1MmaUO-buD8EyZpQ75u4PwRU9_IWXMr8aaX5rtlw9isc7euQ8u3d5ZOnMGJyo-_wB&_nc_ohc=ZLzjMzA5j-wQ7kNvgE-jP6L&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AaVsaEjwCoK3rKesfzUNrP-&oh=00_AYA1Wla7ddr9CZ1iUHPcYsSiEBseIZGJzSDse-3BIDrpvQ&oe=67255EEC",
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
          avatar: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/426432406_1421918355390202_7675829674975645495_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFl67aZnMlTd4ms-b7iG0075iVtMJA8zkrmJW0wkDzOShvogJtPGIvSS5X7Z0o8qekN0DqcCd-jK-zJkBNQyJZZ&_nc_ohc=d3R1cfilbSgQ7kNvgH24tr1&_nc_zt=24&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AyqopH3eF9tqoRUFY4JxLqU&oh=00_AYAZ3ZoFa7mO12zkIDmE2fciMYAFTYYZI3WDwyxTQ39cqg&oe=67257C7C",
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
          avatar: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/236633700_172302625009398_4040565197087624525_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHqj7jdJ-q0VGkRPiEM2u8oNhp9TLfBV_M2Gn1Mt8FX80GyTvgBZ0Mt4dXs5slQPNsDdIzJ7fSAHABrVeCPJW-O&_nc_ohc=rE6bmoUWIYEQ7kNvgGmVVB5&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AI8KKnKrhputWRW2W510bUQ&oh=00_AYBQjnNkwtCj_AA2iJXzrDRkQHEfrgI0L00F7zhkcB85Ug&oe=67259439",
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
          avatar: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/356242142_790051612564958_2728381505184522618_n.jpg?stp=dst-jpg_s640x640&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHW3H0kSxkexeTsJyFwnAOwzEW-rYazZkHMRb6thrNmQSuE9fJYaQJ2FwKxInKFo5pj_sDj9xePF5HvBuYisozY&_nc_ohc=hz_l-AYE7HcQ7kNvgGaVeLw&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AKBqsLkyuaDt4EFsuNBMqMt&oh=00_AYAvGsx-1_gWzs1R1aoDofihsXsrIVLDyUf2qlbVrTPKCA&oe=67256A5F",
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
          avatar: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/438217323_1113926246495635_3885180782697933623_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE4h-CVHiw4SaKD5pHKsoSGmc_0lFdQhLqZz_SUV1CEunRijpfzUvVwGPgJGpMTNMVKmGR7uaDMy0S9Nu7pHCjx&_nc_ohc=qHQI6c9QchIQ7kNvgGmD6TN&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AjuWg8KQMo7N4VXHxl4mwnp&oh=00_AYC8X7mgCiA7DhJg2Pdr-oSdKCFCOmxGR_KmtVW4MlAf8A&oe=6725654E",
        },
      ]);
      console.log("Sample users created!")
    } else {
      console.log("Sample users data already existed!")
    }
  }
}
