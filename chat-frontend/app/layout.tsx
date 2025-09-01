import './globals.css';
import Link from 'next/link';


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<header className="px-6 py-4 border-b flex items-center gap-4">
<Link href="/inbox" className="font-semibold">Chat</Link>
<nav className="ml-auto flex gap-3 text-sm">
<Link href="/inbox">Inbox</Link>
<Link href="/login">Login</Link>
<Link href="/register">Register</Link>
</nav>
</header>
<main className="max-w-6xl mx-auto p-4">{children}</main>
</body>
</html>
);
}