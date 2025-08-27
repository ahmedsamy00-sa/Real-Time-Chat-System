import asyncHandler from "express-async-handler";
import { createConversation, findConversationBetweenUsers, getAllConversationsForUser } from "../models/conversationModel.js";

const createConv = asyncHandler(async (req, res) => {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    if (!receiverId) {
        return res.status(400).json({ message: "Receiver ID is required" });
    };
    if (senderId == receiverId) {
        return res.status(400).json({ message: "Cannot create conversation with yourself" });
    };
    await createConversation(senderId, receiverId);
    res.status(201).json({ message: "Created conversation"});
});

const getAllConvs = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const conversations = await getAllConversationsForUser(userId);
    res.status(200).json(conversations);
});

const getConvBetweenUsers = asyncHandler(async (req, res) => {
    const senderId = req.user.id;
    const receiverName = req.body.name;
    if (!receiverName) {
        return res.status(400).json({ message: "Receiver name is required" });
    };
    const conversation = await findConversationBetweenUsers(senderId, receiverName);
    if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
    };
    res.status(200).json(conversation);
});

export { createConv, getAllConvs, getConvBetweenUsers };