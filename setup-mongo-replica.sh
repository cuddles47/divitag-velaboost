#!/bin/bash

echo "==================================================="
echo "Setting up MongoDB Replica Set on Windows (Bash)"
echo "==================================================="

# Tạo thư mục cho các node trong replica set
echo "Creating directories for replica set nodes..."
mkdir -p /d/data/mongo/rs1
mkdir -p /d/data/mongo/rs2
mkdir -p /d/data/mongo/rs3
echo "Directories created successfully."

# Kiểm tra xem MongoDB đã được cài đặt chưa
if ! command -v mongod &> /dev/null; then
    echo "MongoDB is not installed or not in PATH."
    echo "Please install MongoDB or add it to your PATH and run this script again."
    exit 1
fi

# Dừng các process MongoDB nếu đang chạy
echo "Stopping existing MongoDB processes if running..."
taskkill //F //IM mongod.exe 2>/dev/null || true

# Khởi động các node MongoDB với cấu hình replica set
echo "Starting MongoDB replica set nodes..."
start mongod --replSet rs0 --port 27017 --dbpath /d/data/mongo/rs1 --bind_ip localhost
sleep 5
start mongod --replSet rs0 --port 27018 --dbpath /d/data/mongo/rs2 --bind_ip localhost
sleep 5
start mongod --replSet rs0 --port 27019 --dbpath /d/data/mongo/rs3 --bind_ip localhost
sleep 5

# Khởi tạo replica set
echo "Initializing replica set..."
mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}, {_id: 1, host: 'localhost:27018'}, {_id: 2, host: 'localhost:27019'}]})"
sleep 5

# Kiểm tra trạng thái replica set
echo "Checking replica set status..."
mongo --eval "rs.status()"

# Cập nhật CONNECTION_STRING trong file .env
echo "Updating MongoDB connection string in .env file..."
echo ""
echo "Please update your .env file with the following connection string:"
echo "DATABASE_URL=\"mongodb://localhost:27017,localhost:27018,localhost:27019/bitex?replicaSet=rs0\""
echo ""

echo "==================================================="
echo "MongoDB Replica Set setup completed!"
echo "==================================================="
echo "Primary node: localhost:27017"
echo "Secondary nodes: localhost:27018, localhost:27019"
echo "To connect to this replica set, use the following connection string:"
echo "mongodb://localhost:27017,localhost:27018,localhost:27019/bitex?replicaSet=rs0"
echo "==================================================="