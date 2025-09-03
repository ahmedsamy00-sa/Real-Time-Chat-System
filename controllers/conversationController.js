import asyncHandler from "express-async-handler";
import { createConversation, getAllConversationsForUser } from "../models/conversationModel.js";
import ApiError from "../utils/ApiError.js";

const createConv = asyncHandler(async (req, res, next) => {
    const sender_id = req.user.user_id;
    const receiver = req.body?.phone !== undefined && req.body?.phone !== null? String(req.body.phone).trim(): null;
    if (!receiver) {
        return next(new ApiError("Receiver phone number is required", 400));
    }

    if (!sender_id) {
        return next(new ApiError("Unauthorized: user not found", 401));
    }
    


    const data = await createConversation(sender_id, receiver);
    res.status(201).json({
        message: "Created conversation",
        data: { ...data }
    });
});

const getAllConvs = asyncHandler(async (req, res) => {
    const userId = req.user.user_id;
    const conversations = await getAllConversationsForUser(userId);
    res.status(200).json(conversations);
});


export { createConv, getAllConvs };