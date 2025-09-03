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
import messageSocket from './Sockets/messageSockets.js';
import ApiError from './utils/ApiError.js';
import globalError from './middlewares/errorMiddleware.js';



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
app.use('/imgs', express.static(path.join(__dirname, 'RealTimeChatSystem', 'public', 'imgs')));

// URL error handler
app.all(/.*/, (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use(globalError);

// WebSocket Events
messageSocket(io);


server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
