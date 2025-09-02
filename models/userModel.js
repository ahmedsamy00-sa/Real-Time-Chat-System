import db from '../config/database.js';

const createUser = async (name, email, hashedPassword, phone) =>{
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',[name, email, hashedPassword, phone]);
    return result;
};

const findUserByEmail = async (email) =>{
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const getAllUsers = async() =>{
    const [rows] = await db.execute('SELECT user_id, name, email, phone, created_at from users');
    return rows;
};

export { createUser, findUserByEmail, getAllUsers };