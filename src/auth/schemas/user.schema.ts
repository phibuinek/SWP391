import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Role } from "../enums/role.enum"; // Sử dụng enum Role từ phần auth của bạn
import * as AutoIncrementFactory from "mongoose-sequence";
import { AccountStatus } from "../enums/account-status.enum";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  id: number;
  @Prop()
  avatar: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  // @Prop({ required: true })
  // roleId: number;

  @Prop({ enum: Role, default: Role.CUSTOMER })
  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.CUSTOMER],
  })
  role: Role;

  @Prop({ type: String, enum: AccountStatus, default: "ACTIVE" })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export function configureUserSchema(mongooseConnection: mongoose.Connection) {
  const AutoIncrement = AutoIncrementFactory(mongooseConnection);
  UserSchema.plugin(AutoIncrement, { inc_field: "id" });
}
