import express from 'express';
import { sendMessage, getMessages } from '../controllers/messagesController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

router.post('/:id', authMiddleware, upload.single('image'), sendMessage);
router.get('/:id', authMiddleware, getMessages);

export default router;