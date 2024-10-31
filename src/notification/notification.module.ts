import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Notification,
  NotificationSchema,
} from "./schemas/notification.schema";
import { NotificationService } from "./notification.service";
import { NotificationGateway } from "./notification.gateway";
import { NotificationController } from "./notification.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
  exports: [NotificationService, NotificationGateway], // Export NotificationService để sử dụng ở module khác
})
export class NotificationModule {}