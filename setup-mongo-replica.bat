@echo off
echo ===================================================
echo Setting up MongoDB Replica Set on Windows
echo ===================================================

REM Tạo thư mục cho các node trong replica set trong thư mục dự án
echo Creating directories for replica set nodes...

set DATA_DIR=D:\project\bitex\mongodb-data
if not exist "%DATA_DIR%" mkdir "%DATA_DIR%"
if not exist "%DATA_DIR%\rs1" mkdir "%DATA_DIR%\rs1"
if not exist "%DATA_DIR%\rs2" mkdir "%DATA_DIR%\rs2"
if not exist "%DATA_DIR%\rs3" mkdir "%DATA_DIR%\rs3"

echo Directories created successfully.

REM Kiểm tra xem MongoDB đã được cài đặt chưa
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo MongoDB is not installed or not in PATH.
    echo Please install MongoDB or add it to your PATH and run this script again.
    pause
    exit /b 1
)

REM Dừng dịch vụ MongoDB nếu đang chạy
echo Stopping existing MongoDB service if running...
net stop MongoDB 2>nul
taskkill /F /IM mongod.exe 2>nul

REM Khởi động các node MongoDB với cấu hình replica set
echo Starting MongoDB replica set nodes...
start "MongoDB RS1" cmd /k "mongod --replSet rs0 --port 27017 --dbpath %DATA_DIR%\rs1 --bind_ip localhost"
timeout /t 10
start "MongoDB RS2" cmd /k "mongod --replSet rs0 --port 27018 --dbpath %DATA_DIR%\rs2 --bind_ip localhost"
timeout /t 10
start "MongoDB RS3" cmd /k "mongod --replSet rs0 --port 27019 --dbpath %DATA_DIR%\rs3 --bind_ip localhost"
timeout /t 10

REM Kiểm tra xem MongoDB đã khởi động thành công chưa
echo Checking if MongoDB nodes are running...
timeout /t 5
echo Trying to connect to MongoDB node 1...
mongosh --port 27017 --eval "db.adminCommand('ping')" >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Could not connect to MongoDB node on port 27017.
    echo Check if MongoDB is running and try again.
    echo Make sure no other MongoDB instances are using these ports.
    pause
    exit /b 1
)

REM Kiểm tra xem mongosh tồn tại không
where mongosh >nul 2>nul
if %errorlevel% equ 0 (
    echo Using mongosh to initialize replica set...
    mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}, {_id: 1, host: 'localhost:27018'}, {_id: 2, host: 'localhost:27019'}]})"
    timeout /t 5
    mongosh --eval "rs.status()"
    goto ReplicaSetDone
)

REM Nếu mongosh không tồn tại, kiểm tra xem mongo tồn tại không
where mongo >nul 2>nul
if %errorlevel% equ 0 (
    echo Using mongo to initialize replica set...
    mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}, {_id: 1, host: 'localhost:27018'}, {_id: 2, host: 'localhost:27019'}]})"
    timeout /t 5
    mongo --eval "rs.status()"
    goto ReplicaSetDone
)

REM Nếu cả mongosh và mongo đều không tồn tại
echo MongoDB Shell (mongo or mongosh) is not installed or not in PATH.
echo Please add MongoDB Shell to your PATH and run this script again.
echo.
echo MongoDB Replica Set is running but not initialized.
echo You can initialize it manually by running:
echo rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}, {_id: 1, host: 'localhost:27018'}, {_id: 2, host: 'localhost:27019'}]})
echo in MongoDB Shell.
pause
exit /b 1

:ReplicaSetDone
REM Cập nhật CONNECTION_STRING trong file .env
echo.
echo MongoDB Replica Set initialized successfully!
echo.
echo Verify your .env file contains the following connection string:
echo DATABASE_URL="mongodb://localhost:27017,localhost:27018,localhost:27019/bitex?replicaSet=rs0"
echo.

echo ===================================================
echo MongoDB Replica Set setup completed!
echo ===================================================
echo Primary node: localhost:27017
echo Secondary nodes: localhost:27018, localhost:27019
echo To connect to this replica set, use the following connection string:
echo mongodb://localhost:27017,localhost:27018,localhost:27019/bitex?replicaSet=rs0
echo ===================================================
pause