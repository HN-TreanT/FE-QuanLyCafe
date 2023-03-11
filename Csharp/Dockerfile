# Sử dụng một hình ảnh node làm hình ảnh cơ sở
FROM node:14

# Tạo một thư mục làm nơi chứa mã nguồn
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép tất cả các tệp khác vào thư mục hiện tại
COPY . .

# Khai báo cổng mặc định của ứng dụng là 3001
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]
