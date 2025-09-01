const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME;


export function saveToken(token: string) {
if (typeof document !== 'undefined') {
document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 4}`; 
localStorage.setItem(AUTH_COOKIE_NAME, token); 
}
}


export function clearToken() {
if (typeof document !== 'undefined') {
document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
localStorage.removeItem(AUTH_COOKIE_NAME);
}
}


export function hasToken(): boolean {
if (typeof document === 'undefined') return false;
return (
document.cookie.includes(`${AUTH_COOKIE_NAME}=`) || !!localStorage.getItem(AUTH_COOKIE_NAME)
);
}