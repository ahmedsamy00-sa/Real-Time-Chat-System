import db from "../config/database.js";

const createConversation = async (user1_id, user2_id) => {
    try {
        if (user1_id === user2_id) {
            throw new Error('Cannot find conversation with yourself');
        }
        if(user1_id > user2_id){
            [user1_id, user2_id] = [user2_id, user1_id];
        };
        const [result] = await db.execute(
            'INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)', [user1_id, user2_id]);
            if(result.affectedRows === 0){
                throw new Error('Failed to create conversation');
            }
        return result;
    } catch (err) {
        console.error('Error creating conversation:', err);
        throw err;
    }
};

const findConversationBetweenUsers = async (user1_id, name) => {
    try {
        const [user2Row] = await db.execute('SELECT user_id FROM users WHERE name = ?', [name]);
        if (user2Row.length === 0) {
            throw new Error('User with the given name does not exist');
        };
        const user2_id = user2Row[0].user_id;

        if (user1_id === user2_id) {
            throw new Error('Cannot find conversation with yourself');
        }

        if(user1_id > user2_id){
            [user1_id, user2_id] = [user2_id, user1_id];
        };
        const [rows] = await db.execute(
            'SELECT * FROM conversations WHERE (user1_id = ? AND user2_id = ?)',[user1_id, user2_id,]);
            if(rows.length === 0) {
                throw new Error('Conversation between the users does not exist');
            }
        return rows[0];
    } catch (err) {
        console.error('Error finding conversation between users:', err);
        throw err;
    }
};

const getAllConversationsForUser = async (user_id) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM conversations WHERE user1_id = ? or user2_id = ? ', [user_id, user_id]);
            if(rows.length === 0) {
                throw new Error('No conversations found for the user');
            }
        return rows;
    } catch (err) {
        console.error('Error getting all conversations for user:', err);
        throw err;
    }
}

export { createConversation, findConversationBetweenUsers, getAllConversationsForUser };