import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messagesRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config.env" });

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// mount routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/messages', messageRoutes);

app.all(/.*/, (req, res, next) => {
    const err = new Error(`Can't find this route: ${req.originalUrl}`);
    next(err);
});

// global error handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({
        message: err.message || "Something went wrong"
    });
});

const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (Socket) =>{
    Socket.emit("message", "Welcome to Chat system")
})




server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
