import db from "../config/database.js";

const addMessage = async (convId, content, imagePath, sender_Id) =>{
    const [result] = await db.execute('INSERT INTO messages (conversation_id, message, image, sender_id) VALUES (?, ?, ?, ?)',
    [convId, content, imagePath, sender_Id]);

    if(result.affectedRows === 0) throw new Error('Failed to add message');
    return {
        id: result.insertId,
        conversation_Id: convId,
        sender_Id,
        message: content,
        imagePath,
        timestamp: new Date()
    };
};

const getMessagesByConversationId = async (convId, userId) =>{
    const [ check ] = await db.execute('SELECT * FROM conversations WHERE conversation_id = ? AND (user1_id = ? OR user2_id = ?)', 
    [convId, userId, userId]);
    if(check.length === 0) throw new Error('Conversation not found or access denied');
    
    const [rows] = await db.execute('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC', [convId]);
    return rows;
};

export { addMessage, getMessagesByConversationId };