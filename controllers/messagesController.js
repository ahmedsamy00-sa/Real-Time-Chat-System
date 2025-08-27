import asyncHandler from "express-async-handler";
import { addMessage, getMessagesByConversationId } from "../models/messagesModel.js";

const postMessage = asyncHandler(async (req, res) => {
    const senderId = req.user.id;
    const convId = req.params.id;
    const content = req.body?.content || null;
    const imagePath = req.file?.path || null;
    
    if (!content && !req.file) {
        return res.status(400).json({ message: "Message content or image is required" });
    }    

    await addMessage(convId, content, imagePath, senderId);
    res.status(201).json({ 
        message: "Message sent",
        imageUploaded: !!imagePath,
        imagePath
    });
});

const getMessages = asyncHandler(async (req, res) => {
    const convId = req.params.id;
    const messages = await getMessagesByConversationId(convId);
    res.status(200).json(messages);
});

export { postMessage, getMessages };