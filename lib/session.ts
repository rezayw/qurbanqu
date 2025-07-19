import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET || 'thisissecretqurbanqu123'

export async function getSession() {
  const cookieStore = await cookies(); // karena cookies() adalah Promise
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, SECRET) as { id: string; email: string };
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return null;
  }
}
