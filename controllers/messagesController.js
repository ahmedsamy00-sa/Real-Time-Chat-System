import asyncHandler from "express-async-handler";
import { addMessage, getMessagesByConversationId } from "../models/messagesModel.js";
import ApiError from "../utils/ApiError.js";

const sendMessage = asyncHandler(async (req, res, next) => {
  const sender_id = req.user.user_id;
  const convId = req.params.id;
  const content = req.body?.content || null;
  const imagePath = req.file ? `/imgs/${req.file.filename}` : null;

  const io = req.app.get("io");

  if (!content && !req.file) {
    return next(new ApiError("Message content or image is required", 400));
  }

  const savedMessage = await addMessage(convId, content, imagePath, sender_id);

  io.to(convId).emit("receiveMessage", savedMessage);

  res.status(201).json({
    message: "Message sent successfully",
    data: savedMessage,
  });
});

const getMessages = asyncHandler(async (req, res, next) => {
  const convId = req.params.id;
  const userId = req.user.user_id;

  if (!convId) {
    return next(new ApiError("Conversation ID is required", 400));
  }

  const messages = await getMessagesByConversationId(convId, userId);
  res.status(200).json(messages);
});

export { sendMessage, getMessages };
