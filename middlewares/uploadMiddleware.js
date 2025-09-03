import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve('C:/Users/20122/Documents/Languges/node.js/chat/RealTimeChatSystem/public/imgs');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

export default upload;
