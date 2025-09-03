# Real-Time Chat System

## Overview
This project is a **real-time chat system** built with:
- **Frontend:** Next.js (React), TailwindCSS, Axios  
- **Backend:** Node.js/Express, MySQL, Socket.io, JWT  

The system supports:
- User authentication with JWT  
- One-to-one conversations  
- Text and image messaging  
- Real-time updates  

---

# 🔹 Frontend

### Tech Stack
- **Framework**: Next.js 15+ (App Router)  
- **Styling**: TailwindCSS 4  
- **Forms**: Formik + Yup validation  
- **HTTP Client**: Axios with JWT interceptors  
- **State Management**: React Hooks + Custom hooks  
- **Images**: next/image with optimized loading  

### Prerequisites
- Node.js 18+ and npm  
- Backend API running on `http://localhost:8000/api/v1/`  

### Installation
1. Clone and install dependencies and development server:
   ```bash
   cd RealTimeChatSystem
   npm install
   npm run dev
``

2. Environment Variables (Optional):
   Create a `.env.local` file if you need to customize the API endpoint:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```
   
3. Open your browser:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Project Structure

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

### API Integration

The app integrates with a backend API with the following endpoints:

**Authentication**

* `POST /auth/register` → User registration
* `POST /auth/login` → User login

**Conversations**

* `GET /conversations/` → Get user's conversations
* `POST /conversations/:receiverId` → Create/get conversation

**Messages**

* `GET /messages/:conversationId` → Get conversation messages
* `POST /messages/:receiverId` → Send message (multipart for images)

### Key Features

1. **Authentication Flow**

   * JWT tokens stored in localStorage
   * Automatic token injection via Axios interceptors
   * Protected routes with redirects
   * Token refresh on 401 responses

2. **Real-time Simulation**

   * Polling every 3–5 seconds when tab is active
   * Optimistic UI for instant message appearance
   * Message status tracking (sending → sent → error)

3. **Image Handling**

   * File upload with drag & drop
   * Image preview before sending
   * Support for both URL and base64 images
   * 5MB file size limit with validation

4. **Responsive Design**

   * Mobile-first approach
   * Collapsible sidebar on mobile
   * Touch-friendly interface
   * Proper keyboard navigation

### Form Validation

```ts
Login Form:
  email: string (required, valid email)
  password: string (required, min 6 characters)

Registration Form:
  name: string (required, 2–50 characters)
  email: string (required, valid email)
  password: string (required, min 6 characters)
  confirmPassword: string (required, must match password)

Message Form:
  content: string (optional, max 2000 characters)
  file: File (optional, image only, max 5MB)
```

### Available Scripts

* `npm run dev` → Start development server

---

# 🔹 Backend

### Tech Stack

* Node.js + Express
* MySQL
* Socket.io
* JWT Authentication

### API Documentation

👉 [View full API docs on Postman](https://documenter.getpostman.com/view/42740215/2sB3HgQNtm)

### Project Structure

```
├── App.js
├── config.env
├── Database Scripts.sql
├── config/
│   └── database.js
├── controllers/
│   ├── conversationController.js
│   ├── messagesController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── uploadMiddleware.js
│   └── validateUser.js
├── models/
│   ├── conversationModel.js
│   ├── messagesModel.js
│   └── userModel.js
```

### Available Endpoints

**Authentication**

```http
POST /auth/register → User registration  
POST /auth/login → User login  
```

**Conversations**

```http
GET /conversations/ → Get user conversations  
POST /conversations/:receiverId → Create/get conversation  
```

**Messages**

```http
GET /messages/:conversationId → Get messages  
POST /messages/:receiverId → Send message (supports images)  
```

### Environment Variables

`.env` file example:

```env
PORT=8000
Jwt_secret_key=key123
DB_HOST=localhost
DB_USER=samy
DB_PASS=ahmed123
DB_NAME=chat
```

### Run Backend

```bash
npm install
npm run dev
```

**Note:** Database schema is available in `Database Scripts.sql`.

---

# 🔹 Troubleshooting

---

# 🔹 Repository Navigation

* [Frontend Source](./Frontend)
* [Backend Source](./)

---

## License

This project is part of a real-time chat system implementation.

```
