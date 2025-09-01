import asyncHandler from "express-async-handler";
import { addMessage, getMessagesByConversationId } from "../models/messagesModel.js";

const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.user.id;
    const convId = req.params.id;
    const content = req.body?.content || null;
    const imagePath = req.file?.path || null;
    const io = req.app.get('io');
    
    if (!content && !req.file) {
        return res.status(400).json({ message: "Message content or image is required" });
    }    

    const savedMessage = await addMessage(convId, content, imagePath, senderId);

    io.to(convId).emit('receiveMessage', savedMessage);

    res.status(201).json({
        message: "Message sent successfully",
        data: savedMessage
    });
});

const getMessages = asyncHandler(async (req, res) => {
    const convId = req.params.id;
    const userId = req.user.id;
    const messages = await getMessagesByConversationId(convId, userId);
    res.status(200).json(messages);
});

export { sendMessage, getMessages };