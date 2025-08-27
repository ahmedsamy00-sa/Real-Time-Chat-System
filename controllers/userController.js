import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, getAllUsers } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerOne = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "Invalid Email" });
    };
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await createUser(name, email, hashedPassword);

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

const loginOne = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: "Invalid Email or Password" });
    };
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Email or Password" });
    };
    const token = jwt.sign({ id: user.user_id, email: user.Email },process.env.Jwt_secret_key,{ expiresIn: '5h' });
    res.status(200).json({ token, message: "Login successful" });
});

const getAll = asyncHandler(async(req,res) =>{
    const users = await getAllUsers();
    res.status(200).json(users);
});

export { registerOne, loginOne, getAll };