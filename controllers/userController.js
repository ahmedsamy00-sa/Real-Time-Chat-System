import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, getAllUsers } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const registerOne = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return next(new ApiError("Email already in use", 400));
    };
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await createUser(name, email, hashedPassword, phone);

    const token = jwt.sign({ id: user.user_id, email: user.Email },process.env.Jwt_secret_key,{ expiresIn: '5h' });

    res.status(201).json({
        user: {
            id: user.user_id, 
            name,
            email
        },
        message: "User registered successfully",
        token
    });
});

const loginOne = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return next(new ApiError("Invalid Email or Password", 400));
    };
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
        return next(new ApiError("Invalid Email or Password", 400));
    };
    const token = jwt.sign({ id: user.user_id, email: user.Email },process.env.Jwt_secret_key,{ expiresIn: '5h' });
    res.status(200).json({ token, message: "Login successful",
        user: {
            id: user.user_id, 
            name: user.Name,
            email: user.Email
        }});
});

const getAll = asyncHandler(async(req,res) =>{
    const users = await getAllUsers();
    res.status(200).json(users);
});

export { registerOne, loginOne, getAll };