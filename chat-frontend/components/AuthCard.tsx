'use client';
import { useState } from 'react';
import { login, register } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';


export default function AuthCard({ mode }: { mode: 'login' | 'register' }) {
const r = useRouter();
const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


async function submit(e: React.FormEvent) {
e.preventDefault();
setError(null); setLoading(true);
try {
if (mode === 'login') {
const res = await login(form.email, form.password);
saveToken(res.token);
r.replace('/inbox');
} else {
const res = await register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
saveToken(res.token);
r.replace('/inbox');
}
} catch (err: any) {
setError(err?.response?.data?.message || 'Something went wrong');
} finally { setLoading(false); }
}


return (
<form onSubmit={submit} className="card container" style={{ maxWidth: 440 }}>
<h2>{mode === 'login' ? 'Login' : 'Create account'}</h2>
{mode === 'register' && (
<input className="input" placeholder="Name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required />
)}
<input className="input" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} required />
<input className="input" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} required />
{mode === 'register' && (
<input className="input" placeholder="Phone (11 digits)" value={form.phone} onChange={(e)=>setForm({ ...form, phone: e.target.value })} required />
)}
{error && <div className="text-muted">{error}</div>}
<button className={`btn primary`} disabled={loading}>{loading ? 'Please wait…' : (mode === 'login' ? 'Login' : 'Register')}</button>
</form>
);
}