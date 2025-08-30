import db from "../config/database.js";

const addMessage = async (convId, content, imagePath, senderId) =>{
    try{
        const [result] = await db.execute('INSERT INTO messages (conversation_id, message, image, sender_id) VALUES (?, ?, ?, ?)',
        [convId, content, imagePath, senderId]);
        if(result.affectedRows === 0){
            throw new Error('Failed to create message');   
        }
        return {
            id: result.insertId,
            conversationId: convId,
            senderId,
            message: content,
            imagePath,
            timestamp: new Date()
        };
        }catch(err){
        console.error('Error Sending Message:', err);
        throw err;
    }
};

const getMessagesByConversationId = async (convId) =>{
    try{
        const [rows] = await db.execute('SELECT * FROM messages WHERE conversation_id = ?', [convId]);
        return rows;
    }catch(err){
        console.error('Error fetching messages:', err);
        throw err;
    }
};

export { addMessage, getMessagesByConversationId };