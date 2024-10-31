import io from "socket.io-client";

export const connectSocket = () => {
  const socket = io("http://localhost:3000"); // Thay bằng URL của server nếu chạy trên môi trường khác
  return socket;
};

export const listenForNotifications = (socket, callback) => {
  socket.on("notification", (data) => {
    callback(data); // Trả về dữ liệu notification nhận được
  });
};