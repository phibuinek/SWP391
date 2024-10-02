# Sử dụng Node.js phiên bản LTS
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install --production

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Mở port mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "run", "start:prod"]
