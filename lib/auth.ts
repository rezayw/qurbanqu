import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null

  try {
    const SECRET = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, SECRET) as { id: string; email: string }
    return decoded
  } catch {
    return null
  }
}
