import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Role } from "../enums/role.enum"; // Sử dụng enum Role từ phần auth của bạn
import * as AutoIncrementFactory from "mongoose-sequence";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  id: number;
  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  roleId: number;

  @Prop({ enum: Role, default: Role.Customers })
  role: Role;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  updatedBy: number;

  @Prop({ enum: ["ACTIVE", "INACTIVE", "BANNED"], default: "ACTIVE" })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export function configureUserSchema(mongooseConnection: mongoose.Connection) {
  const AutoIncrement = AutoIncrementFactory(mongooseConnection);
  UserSchema.plugin(AutoIncrement, { inc_field: "id" });
}
