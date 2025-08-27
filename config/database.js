import mySql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'config.env') });

const db = mySql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try {
        const conn = await db.getConnection();
        console.log("Database connected.");
        conn.release();
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

testConnection();


export default db;