import { Controller, Get, Param, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get("user/:userId")
  getNotificationsForUser(@Param("userId") userId: string) {
    return this.notificationService.getNotificationsForUser(userId);
  }

  @Post("mark-read/:notificationId")
  markNotificationAsRead(@Param("notificationId") notificationId: string) {
    return this.notificationService.markAsRead(notificationId);
  }
}
