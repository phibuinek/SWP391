import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Notification,
  NotificationSchema,
} from "./schemas/notification.schema";
import { NotificationService } from "./notification.service";
import { NotificationGateway } from "./notification.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService], // Để có thể sử dụng service này ở các module khác
})
export class NotificationModule {}
