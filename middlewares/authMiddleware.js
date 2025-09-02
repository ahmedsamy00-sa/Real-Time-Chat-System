import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError("You are not authenticated! Please login to get access.", 401));
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.Jwt_secret_key);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new ApiError("You are not authenticated! Please login to get access.", 401));
    }
};

export default authMiddleware;
