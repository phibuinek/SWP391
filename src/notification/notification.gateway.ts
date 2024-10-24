import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotificationToAll(message: string, details: any) {
    this.server.emit("notification", { message, details });
  }

  sendNotificationToUser(
    userId: string,
    data: { message: string; details: any },
  ) {
    this.server.to(userId).emit("notification", data);
  }

  @SubscribeMessage("message")
  handleMessage(@MessageBody() data: string): string {
    return data;
  }
}
