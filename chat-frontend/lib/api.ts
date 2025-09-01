import axios from 'axios';


const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'chat_jwt';


function readToken(): string | null {
if (typeof window === 'undefined') return null;
const cookie = document.cookie.split('; ').find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));
if (cookie) return decodeURIComponent(cookie.split('=')[1]);
return localStorage.getItem(AUTH_COOKIE_NAME);
}


export const api = axios.create({ baseURL: API_BASE });


api.interceptors.request.use((config) => {
const token = readToken();
if (token) {
config.headers = config.headers || {};
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});


export async function login(email: string, password: string) {
const { data } = await api.post('/users/login', { email, password });
return data as { token: string; message: string };
}


export async function register(payload: { name: string; email: string; password: string; phone: string }) {
const { data } = await api.post('/users/register', payload);
return data as { token: string; message: string };
}


export async function listUsers() {
const { data } = await api.get('/users');
return data as any[];
}


export async function createConversation(phone: string) {
const { data } = await api.post('/conversations', { phone });
return data;
}


export async function getConversations() {
const { data } = await api.get('/conversations/friends');
return data as any[];
}


export async function getMessages(conversationId: string | number) {
const { data } = await api.get(`/messages/${conversationId}`);
return data as any[];
}


export async function sendMessage(conversationId: string | number, content?: string, file?: File) {
const form = new FormData();
if (content) form.append('content', content);
if (file) form.append('image', file);
const { data } = await api.post(`/messages/${conversationId}`, form, {
headers: { 'Content-Type': 'multipart/form-data' },
});

return data;
}