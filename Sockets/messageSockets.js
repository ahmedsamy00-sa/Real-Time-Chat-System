export default function messageSocket(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('joinConversation', (conversationId) => {
            socket.join(conversationId);
            console.log(`User joined conversation: ${conversationId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}
