// app/api/reset-password/route.ts

import { connectDB } from '../../../lib/db'
import { User } from '../../../models/user'
import { PasswordResetToken } from '../../../models/token'
import { hashPassword } from '../../../utils/encrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connectDB()

  const { token, newPassword } = await req.json()

  if (!token || !newPassword) {
    return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 })
  }

  const tokenDoc = await PasswordResetToken.findOne({ token })

  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    return NextResponse.json({ message: 'Token tidak valid atau sudah kadaluarsa' }, { status: 400 })
  }

  const user = await User.findById(tokenDoc.userId)
  if (!user) {
    return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 })
  }

  user.password = hashPassword(newPassword)
  await user.save()

  await PasswordResetToken.deleteOne({ _id: tokenDoc._id })

  return NextResponse.json({ message: 'Password berhasil direset' }, { status: 200 })
}
