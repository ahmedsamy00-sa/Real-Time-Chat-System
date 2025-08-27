import express from 'express';
import { registerOne, loginOne, getAll } from '../controllers/userController.js';
import { validateCreateUser, validateLogin, handleValidateError } from '../middlewares/validateUser.js';

const router = express.Router();

router.route('/register').post(validateCreateUser, handleValidateError, registerOne)
router.route('/login').post(validateLogin, handleValidateError, loginOne);
router.route('/').get(getAll);

export default router;