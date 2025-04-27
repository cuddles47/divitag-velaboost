@echo off
echo ===================================
echo Refactoring project to Backend/Frontend structure
echo ===================================

REM Create main directories
echo Creating directory structure...
mkdir frontend
mkdir backend

REM Copy frontend related files
echo Copying frontend files...
xcopy src\app\*.* frontend\app\ /E /I /Y
xcopy src\domains\* frontend\domains\ /E /I /Y
xcopy src\shared\components\* frontend\components\ /E /I /Y
xcopy src\shared\hooks\* frontend\hooks\ /E /I /Y
xcopy src\store\* frontend\store\ /E /I /Y
xcopy public\* frontend\public\ /E /I /Y
xcopy next.config.js frontend\ /Y
xcopy next-env.d.ts frontend\ /Y
xcopy postcss.config.mjs frontend\ /Y
xcopy tailwind.config.js frontend\ /Y
xcopy tsconfig.json frontend\ /Y

REM Copy backend related files
echo Copying backend files...
xcopy src\actions\* backend\actions\ /E /I /Y
xcopy src\api\* backend\api\ /E /I /Y
xcopy src\core\* backend\core\ /E /I /Y
xcopy src\errors\* backend\errors\ /E /I /Y
xcopy prisma\* backend\prisma\ /E /I /Y

REM Create frontend package.json
echo Creating frontend package.json...
echo {> frontend\package.json
echo   "name": "bitex-frontend",>> frontend\package.json
echo   "version": "0.1.0",>> frontend\package.json
echo   "private": true,>> frontend\package.json
echo   "scripts": {>> frontend\package.json
echo     "dev": "next dev",>> frontend\package.json
echo     "build": "next build",>> frontend\package.json
echo     "start": "next start",>> frontend\package.json
echo     "lint": "next lint",>> frontend\package.json
echo     "lint:fix": "next lint --fix">> frontend\package.json
echo   },>> frontend\package.json
echo   "dependencies": {>> frontend\package.json
echo     "@next-auth/prisma-adapter": "^1.0.7",>> frontend\package.json
echo     "@prisma/client": "^5.9.1",>> frontend\package.json
echo     "@reduxjs/toolkit": "^2.1.0",>> frontend\package.json
echo     "@tailwindcss/postcss": "^4.0.14",>> frontend\package.json
echo     "next": "^14.2.26",>> frontend\package.json
echo     "next-auth": "^4.24.6",>> frontend\package.json
echo     "react": "^18.3.1",>> frontend\package.json
echo     "react-dom": "^18.3.1",>> frontend\package.json
echo     "react-redux": "^9.1.0",>> frontend\package.json
echo     "tailwind-merge": "^3.0.2",>> frontend\package.json
echo     "zod": "^3.22.4">> frontend\package.json
echo   },>> frontend\package.json
echo   "devDependencies": {>> frontend\package.json
echo     "@types/react": "^18",>> frontend\package.json
echo     "@types/react-dom": "^18",>> frontend\package.json
echo     "autoprefixer": "^10.4.21",>> frontend\package.json
echo     "clsx": "^2.1.1",>> frontend\package.json
echo     "eslint": "^8",>> frontend\package.json
echo     "eslint-config-next": "^14.2.26",>> frontend\package.json
echo     "eslint-config-prettier": "^10.1.1",>> frontend\package.json
echo     "eslint-plugin-import": "^2.31.0",>> frontend\package.json
echo     "postcss": "^8.5.3",>> frontend\package.json
echo     "tailwindcss": "^4.0.14",>> frontend\package.json
echo     "typescript": "^5">> frontend\package.json
echo   }>> frontend\package.json
echo }>> frontend\package.json

REM Create backend package.json
echo Creating backend package.json...
echo {> backend\package.json
echo   "name": "bitex-backend",>> backend\package.json
echo   "version": "0.1.0",>> backend\package.json
echo   "private": true,>> backend\package.json
echo   "scripts": {>> backend\package.json
echo     "dev": "nodemon --exec ts-node src/index.ts",>> backend\package.json
echo     "build": "tsc",>> backend\package.json
echo     "start": "node dist/index.js",>> backend\package.json
echo     "prisma:generate": "prisma generate",>> backend\package.json
echo     "prisma:migrate": "prisma migrate dev",>> backend\package.json
echo     "seed": "ts-node prisma/seed/index.ts">> backend\package.json
echo   },>> backend\package.json
echo   "dependencies": {>> backend\package.json
echo     "@prisma/client": "^5.9.1",>> backend\package.json
echo     "bcrypt": "^5.1.1",>> backend\package.json
echo     "express": "^4.18.2",>> backend\package.json
echo     "zod": "^3.22.4">> backend\package.json
echo   },>> backend\package.json
echo   "devDependencies": {>> backend\package.json
echo     "@types/bcrypt": "^5.0.2",>> backend\package.json
echo     "@types/express": "^4.17.17",>> backend\package.json
echo     "@types/node": "^20",>> backend\package.json
echo     "eslint": "^8",>> backend\package.json
echo     "eslint-config-prettier": "^10.1.1",>> backend\package.json
echo     "eslint-plugin-import": "^2.31.0",>> backend\package.json
echo     "nodemon": "^3.0.1",>> backend\package.json
echo     "prisma": "^5.9.1",>> backend\package.json
echo     "ts-node": "^10.9.2",>> backend\package.json
echo     "typescript": "^5">> backend\package.json
echo   }>> backend\package.json
echo }>> backend\package.json

REM Create backend tsconfig.json
echo Creating backend tsconfig.json...
echo {> backend\tsconfig.json
echo   "compilerOptions": {>> backend\tsconfig.json
echo     "target": "es2017",>> backend\tsconfig.json
echo     "module": "commonjs",>> backend\tsconfig.json
echo     "esModuleInterop": true,>> backend\tsconfig.json
echo     "forceConsistentCasingInFileNames": true,>> backend\tsconfig.json
echo     "strict": true,>> backend\tsconfig.json
echo     "skipLibCheck": true,>> backend\tsconfig.json
echo     "outDir": "dist",>> backend\tsconfig.json
echo     "rootDir": "src",>> backend\tsconfig.json
echo     "baseUrl": ".">> backend\tsconfig.json
echo   },>> backend\tsconfig.json
echo   "include": ["src/**/*"],>> backend\tsconfig.json
echo   "exclude": ["node_modules"]>> backend\tsconfig.json
echo }>> backend\tsconfig.json

REM Create backend entry point
echo Creating backend entry point...
mkdir backend\src
echo // Backend entry point> backend\src\index.ts
echo import { PrismaClient } from '@prisma/client';>> backend\src\index.ts
echo const express = require('express');>> backend\src\index.ts
echo const app = express();>> backend\src\index.ts
echo const port = process.env.PORT || 3001;>> backend\src\index.ts
echo >> backend\src\index.ts
echo const prisma = new PrismaClient();>> backend\src\index.ts
echo >> backend\src\index.ts
echo app.use(express.json());>> backend\src\index.ts
echo >> backend\src\index.ts
echo app.get('/api/health', (req, res) => {>> backend\src\index.ts
echo   res.json({ status: 'ok', timestamp: new Date() });>> backend\src\index.ts
echo });>> backend\src\index.ts
echo >> backend\src\index.ts
echo app.listen(port, () => {>> backend\src\index.ts
echo   console.log(`Backend server running on port ${port}`);>> backend\src\index.ts
echo });>> backend\src\index.ts

REM Create README files with instructions
echo Creating README files with instructions...
echo # Bitex Frontend> frontend\README.md
echo >> frontend\README.md
echo This is the frontend part of the Bitex application.>> frontend\README.md
echo >> frontend\README.md
echo ## Getting Started>> frontend\README.md
echo >> frontend\README.md
echo 1. Install dependencies:>> frontend\README.md
echo    ```>> frontend\README.md
echo    npm install>> frontend\README.md
echo    ```>> frontend\README.md
echo >> frontend\README.md
echo 2. Run development server:>> frontend\README.md
echo    ```>> frontend\README.md
echo    npm run dev>> frontend\README.md
echo    ```>> frontend\README.md

echo # Bitex Backend> backend\README.md
echo >> backend\README.md
echo This is the backend part of the Bitex application.>> backend\README.md
echo >> backend\README.md
echo ## Getting Started>> backend\README.md
echo >> backend\README.md
echo 1. Install dependencies:>> backend\README.md
echo    ```>> backend\README.md
echo    npm install>> backend\README.md
echo    ```>> backend\README.md
echo >> backend\README.md
echo 2. Set up the database:>> backend\README.md
echo    ```>> backend\README.md
echo    npm run prisma:generate>> backend\README.md
echo    npm run prisma:migrate>> backend\README.md
echo    npm run seed>> backend\README.md
echo    ```>> backend\README.md
echo >> backend\README.md
echo 3. Start the development server:>> backend\README.md
echo    ```>> backend\README.md
echo    npm run dev>> backend\README.md
echo    ```>> backend\README.md

echo ===================================
echo Refactoring complete!
echo ===================================
echo.
echo Next steps:
echo 1. Navigate to frontend folder and run "npm install"
echo 2. Navigate to backend folder and run "npm install"
echo 3. Start both servers separately:
echo    - In frontend folder: npm run dev
echo    - In backend folder: npm run dev
echo.
echo NOTE: You may need to adjust API endpoints in frontend code to point to the backend server.
echo.
pause