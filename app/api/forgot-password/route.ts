import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/db'
import { User } from '../../../models/user'
import crypto from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    await connectDB()

    const { email } = await req.json()

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: 'Email tidak ditemukan' }, { status: 404 })
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600 * 1000) // 1 jam

    // Simpan ke user
    user.resetToken = token
    user.resetTokenExpires = expires
    await user.save()

    // Buat link reset
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${email}`

    // Kirim email dengan Resend
    await resend.emails.send({
      from: 'QurbanQu <noreply@qurbanqu.com>',
      to: email,
      subject: 'Reset Password QurbanQu',
      html: `
        <h2>Reset Password</h2>
        <p>Klik link di bawah ini untuk reset password:</p>
        <a href="${resetLink}" target="_blank" style="color: #10b981;">Reset Password</a>
        <p>Link ini hanya berlaku selama 1 jam.</p>
      `,
    })

    return NextResponse.json({ message: 'Link reset berhasil dikirim' })
  } catch (error) {
    console.error('Error forgot-password:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
