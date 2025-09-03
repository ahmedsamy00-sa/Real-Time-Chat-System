import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import db from "../config/database.js";

const authMiddleware = expressAsyncHandler(async(req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError("You are not authenticated! Please login to get access.", 401));
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.Jwt_secret_key);
      const [rows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [decoded.id]);

    if (!rows[0]) {
        return next( new ApiError("User not found",404));
    }

    req.user = rows[0];
        next();
});

export default authMiddleware;
