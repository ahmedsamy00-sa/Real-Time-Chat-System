# Real-Time Chat System Frontend

A minimal real-time chat frontend built with Next.js, TailwindCSS, Formik, Yup, and Axios. This application provides JWT authentication, conversation management, and real-time messaging with optimistic UI updates.

## Features

- **Authentication**: JWT-based login and registration with Formik + Yup validation
- **Real-time Messaging**: Polling-based message updates
- **Optimistic UI**: Messages appear instantly and sync with the backend
- **Media Support**: Image sharing with preview and base64 fallback
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Search**: Find conversations by participant name or message content
- **Protected Routes**: Automatic redirection for authentication

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: TailwindCSS 4
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios with JWT interceptors
- **State Management**: React Hooks + Custom hooks
- **Images**: next/image with optimized loading

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000/api/v1/`

## Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Environment Variables (Optional):**
   Create a `.env.local` file if you need to customize the API endpoint:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── login/page.tsx          # Login page
│   ├── register/page.tsx       # Registration page
│   ├── chat/page.tsx           # Main chat interface
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (redirects)
│   └── globals.css             # Global styles
├── components/
│   ├── AuthForm.tsx            # Reusable auth form
│   ├── Avatar.tsx              # User avatar component
│   ├── ChatWindow.tsx          # Main chat interface
│   ├── ConversationItem.tsx    # Individual conversation
│   ├── ConversationsList.tsx   # Sidebar with conversations
│   ├── MessageBubble.tsx       # Individual message
│   └── MessageInput.tsx        # Message input with file upload
├── hooks/
│   ├── useAuth.ts              # Authentication hook
│   ├── useConversations.ts     # Conversations management
│   └── useMessages.ts          # Messages with optimistic updates
├── lib/
│   ├── api.ts                  # Axios instance with interceptors
│   ├── auth.ts                 # Auth service functions
│   └── socket.ts               # Placeholder file (WebSocket removed)
└── utils/
    ├── validators.ts           # Yup validation schemas
    └── date.ts                 # Date formatting utilities
```

## API Integration

The app integrates with a backend API with the following endpoints:

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Conversations

- `GET /conversations/` - Get user's conversations
- `POST /conversations/:receiverId` - Create/get conversation

### Messages

- `GET /messages/:conversationId` - Get conversation messages
- `POST /messages/:receiverId` - Send message (multipart for images)

## Key Features Explained

### 1. Authentication Flow

- JWT tokens stored in localStorage
- Automatic token injection via Axios interceptors
- Protected routes with redirects
- Token refresh on 401 responses

### 2. Real-time Simulation

- Polling every 3-5 seconds when tab is active
- Optimistic UI for instant message appearance
- Message status tracking (sending → sent → error)

### 3. Image Handling

- File upload with drag & drop
- Image preview before sending
- Support for both URL and base64 images
- 5MB file size limit with validation

### 4. Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface
- Proper keyboard navigation

## Form Validation

### Login Form

```typescript
email: string (required, valid email)
password: string (required, min 6 characters)
```

### Registration Form

```typescript
name: string (required, 2-50 characters)
email: string (required, valid email)
password: string (required, min 6 characters)
confirmPassword: string (required, must match password)
```

### Message Form

```typescript
content: string (optional, max 2000 characters)
file: File (optional, image only, max 5MB)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start production server:**

   ```bash
   npm start
   ```

3. **Environment Variables for Production:**
   Set `NEXT_PUBLIC_API_URL` to your production API endpoint.

## Future Enhancements

### Additional Features

- **Push Notifications**: Browser notifications for new messages
- **Cloud Storage**: Upload images to AWS S3/Cloudinary
- **Message Search**: Full-text search across conversation history
- **Voice Messages**: Audio recording and playback
- **Emoji Reactions**: React to messages with emojis
- **Read Receipts**: Track message read status
- **Group Chats**: Multi-participant conversations

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from `http://localhost:3000`
2. **Token Expiry**: The app automatically redirects to login on 401 responses
3. **Image Upload**: Check file size (max 5MB) and format (images only)
4. **Styling Issues**: Clear browser cache after CSS changes

### Development Tips

1. **API Testing**: Use the browser network tab to debug API calls
2. **State Debugging**: Add console.logs in custom hooks
3. **Responsive Testing**: Use browser dev tools device emulation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a real-time chat system implementation.
