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
import messageSocket from './sockets/messageSockets.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
app.use(helmet());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    },
});

app.set('io', io);

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

// WebSocket Events
messageSocket(io);


server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
