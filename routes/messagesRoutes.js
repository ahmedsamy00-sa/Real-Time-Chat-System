import express from 'express';
import { postMessage, getMessages } from '../controllers/messagesController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

router.post('/:id', authMiddleware, upload.single('image'), postMessage);
router.get('/:id', authMiddleware, getMessages);

export default router;