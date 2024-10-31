import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/schemas/user.schema";
import { EventSchema } from "./schemas/event.schema";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    ],
    controllers: [EventController],
    providers: [EventService],
    exports: [MongooseModule],
  })
  export class EventModule {}