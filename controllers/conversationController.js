import asyncHandler from "express-async-handler";
import { createConversation, getAllConversationsForUser } from "../models/conversationModel.js";
import ApiError from "../utils/ApiError.js";

const createConv = asyncHandler(async (req, res, next) => {
    const sender_id = req.user.id;
    const receiver = req.body.phone;
    if (!receiver) {
        return next(new ApiError("Receiver phone number is required", 400));
    }
    const data = await createConversation(sender_id, receiver);
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