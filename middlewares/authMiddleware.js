import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "You are not authenticated" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.Jwt_secret_key);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid or expired" });
    }
};

export default authMiddleware;
