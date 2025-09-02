import db from "../config/database.js";

const createConversation = async (user1_id, phone) => {
    const [rows] = await db.execute('SELECT user_id FROM users WHERE phone = ?', [phone]);
    if (rows.length === 0) throw new Error('User with this phone number does not exist');

    let user2_id = rows[0].user_id;

    if (user1_id === user2_id) throw new Error('Cannot create conversation with yourself');

        if (user1_id > user2_id) [user1_id, user2_id] = [user2_id, user1_id];

        const [result] = await db.execute(
            'INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)',
            [user1_id, user2_id]
        );

        if (result.affectedRows === 0) throw new Error('Failed to create conversation');

        return {
            conversation_id: result.insertId,
            user1_id,
            user2_id
        };
};


const getAllConversationsForUser = async (user_id) => {
        const [rows] = await db.execute(
            `SELECT c.conversation_id,
                    CASE
                        WHEN c.user1_id = ? THEN u2.name ELSE u1.name
                    END AS other_user_name,
                    m.message_id,
                    COALESCE(m.message, '') AS last_message,
                    COALESCE(m.created_at, c.created_at) AS last_message_time
                FROM conversations c
                JOIN users u1 ON u1.user_id = c.user1_id
                JOIN users u2 ON u2.user_id = c.user2_id
                LEFT JOIN messages m ON m.message_id = (
                    SELECT message_id 
                    FROM messages 
                    WHERE conversation_id = c.conversation_id 
                    ORDER BY created_at DESC 
                    LIMIT 1
                )
                WHERE c.user1_id = ? OR c.user2_id = ?
                ORDER BY last_message_time DESC;`,
            [user_id, user_id, user_id]
        );
        return rows;
};

export { createConversation, getAllConversationsForUser };
