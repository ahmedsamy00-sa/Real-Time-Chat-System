import db from '../config/database.js';

const createUser = async (name, email, hashedPassword, phone) =>{
    try{
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',[name, email, hashedPassword, phone]);
    return result;
    }catch(err){
        console.error('Error creating user:', err);
        throw err;
    }
};

const findUserByEmail = async (email) =>{
    try{
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
    }catch(err){
        console.error('Error finding user by email:', err);
        throw err;
    }
};

const getAllUsers = async() =>{
    try{
    const [rows] = await db.execute('SELECT * from users');
    return rows;
    }catch(err){
        console.error('Error getting all users:', err);
        throw err;
    }
};

export { createUser, findUserByEmail, getAllUsers };