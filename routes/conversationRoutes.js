import express from 'express';
import { createConv, getAllConvs, getConvBetweenUsers } from '../controllers/conversationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.route('/find').post(authMiddleware, getConvBetweenUsers);
router.route('/').post(authMiddleware, createConv);
router.route('/friends').get(authMiddleware, getAllConvs)

export default router;