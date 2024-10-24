import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification } from "./schemas/notification.schema"; // Đảm bảo đường dẫn này đúng
import { NotificationGateway } from "./notification.gateway"; // Đảm bảo đường dẫn đúng

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  // Phương thức để xử lý yêu cầu nhận nuôi thú cưng
  async requestAdoption(userId: string, petId: string) {
    const message = `User ${userId} đã yêu cầu nhận nuôi thú cưng ${petId}`;
    const details = {
      action: "request_adoption",
      petId,
    };

    // Tạo thông báo cho admin
    await this.createAndSendNotification(userId, message, details, "admin");
  }

  // Phương thức để xử lý xóa thú cưng
  async deletePet(userId: string, petId: string, petName: string) {
    const message = `User ${userId} đã xóa thú cưng ${petName}`;
    const details = {
      action: "delete_pet",
      petId,
      petName,
    };

    // Tạo thông báo cho admin
    await this.createAndSendNotification(userId, message, details, "admin");
  }

  // Phương thức tạo và gửi thông báo
  private async createAndSendNotification(
    senderId: string,
    message: string,
    details: any,
    role: string,
  ) {
    const notification = new this.notificationModel({
      sender: senderId,
      message,
      details,
      role,
    });
    await notification.save();

    // Gửi thông báo qua WebSocket
    this.notificationGateway.sendNotificationToAll(message, details);
  }

  // Phương thức lấy thông báo cho người dùng
  async getNotificationsForUser(userId: string) {
    return this.notificationModel.find({ sender: userId }).exec();
  }

  // Phương thức đánh dấu thông báo là đã đọc
  async markAsRead(notificationId: string) {
    return this.notificationModel
      .findByIdAndUpdate(notificationId, { isRead: true }, { new: true })
      .exec();
  }
}
