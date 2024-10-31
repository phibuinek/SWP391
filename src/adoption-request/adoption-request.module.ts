import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  AdoptionRequest,
  AdoptionRequestSchema,
} from "./schemas/adoption-request.schema";
import { AdoptionRequestController } from "./adoption-request.controller";
import { AdoptionRequestService } from "./adoption-request.service";
import { NotificationService } from "src/notification/notification.service";
import { NotificationModule } from "src/notification/notification.module";
import { UserModule } from "src/user/user.module";
import { PetModule } from "src/pet/pet.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdoptionRequest.name, schema: AdoptionRequestSchema },
    ]),
    NotificationModule,
    UserModule,
    PetModule,
  ],
  controllers: [AdoptionRequestController],
  providers: [AdoptionRequestService],
  exports: [MongooseModule],
})
export class AdoptionRequestModule {}