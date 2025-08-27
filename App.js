import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messagesRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import  Cors  from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path:"./config.env"});

const app = express();

//middlewares
app.use(Cors());
app.use(helmet());
app.use(express.json());

//mount routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/messages', messageRoutes);

app.all(/.*/, (req, res, next) => {
    const err = new Error(`Can't find this route: ${req.originalUrl}`);
    next(err.message);
});

//global error handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err); 
    res.status(500).json({
        message: err.message || err || "Something went wrong"
    });
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
