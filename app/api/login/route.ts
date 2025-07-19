import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/db'
import { User } from '../../../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  await connectDB()

  const { email, password } = await req.json()

  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Email atau password salah' },
      { status: 401 }
    )
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1d',
    }
  )

  const response = NextResponse.json({ message: 'Login berhasil' })

  // Set cookie 'session' agar bisa dibaca oleh getSession()
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 hari
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
