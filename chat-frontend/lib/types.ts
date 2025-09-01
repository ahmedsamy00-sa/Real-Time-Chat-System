export type User = {
    user_id?: number;
    name: string;
    Email?: string;
    email?: string;
    phone: string;
    };
    
    
    export type Conversation = {
    id: number;
    user1_id: number;
    user2_id: number;
    last_message?: string | null;
    last_message_time?: string | null;
    };
    
    
    export type Message = {
    id: number;
    conversationId: number;
    senderId: number;
    message: string | null;
    imagePath: string | null;
    timestamp: string;
    };