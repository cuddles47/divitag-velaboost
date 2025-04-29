import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js';

const router = Router();

// Các routes public
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Routes yêu cầu xác thực
router.get('/me', authMiddleware, AuthController.getCurrentUser);
router.put('/me', authMiddleware, AuthController.updateUserProfile);
router.put('/change-password', authMiddleware, AuthController.changePassword);

export default router;