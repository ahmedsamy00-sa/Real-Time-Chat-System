import { body , validationResult } from 'express-validator';

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

const validateCreateUser = [
    body('name').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
];

const handleValidateError = (req,res,nxt)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    nxt();
}
export { validateLogin, validateCreateUser, handleValidateError };