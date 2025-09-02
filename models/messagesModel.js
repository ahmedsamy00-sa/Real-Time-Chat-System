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

const getMessagesByConversationId = async (convId, userId) =>{
    try{
        if(!convId) throw new Error('Conversation ID is required');
        const [ check ] = await db.execute('SELECT * FROM conversations WHERE conversation_id = ? AND (user1_id = ? OR user2_id = ?)', [convId, userId, userId]);
        if(check[0].length === 0) throw new Error('Access Denied');
        
        const [rows] = await db.execute('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC', [convId]);
        return rows;
    }catch(err){
        console.error('Error fetching messages:', err);
        throw err;
    }
};

export { addMessage, getMessagesByConversationId };