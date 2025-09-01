import asyncHandler from "express-async-handler";
import { createConversation, getAllConversationsForUser } from "../models/conversationModel.js";

const createConv = asyncHandler(async (req, res) => {
    const senderId = req.user.id;
    const receiver = req.body.phone;
    if (!receiver) {
        return res.status(400).json({ message: "Receiver phone is required" });
    };
    const data = await createConversation(senderId, receiver);
    res.status(201).json({
        message: "Created conversation",
        data: { ...data }
    });
});

const getAllConvs = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const conversations = await getAllConversationsForUser(userId);
    res.status(200).json(conversations);
});


export { createConv, getAllConvs };