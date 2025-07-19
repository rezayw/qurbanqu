// app/api/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '../../../lib/db'
import { User } from '../../../models/user'

const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com']
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const {
    fullName,
    name,
    dob,
    phone,
    email,
    password,
    confirmPassword,
    acceptPolicy,
  } = await req.json()

  if (!acceptPolicy) {
    return NextResponse.json({ message: 'Harap menyetujui Privacy Policy' }, { status: 400 })
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ message: 'Password dan konfirmasi tidak cocok' }, { status: 400 })
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Format email tidak valid' }, { status: 400 })
  }

  const domain = email.split('@')[1]
  if (!allowedDomains.includes(domain)) {
    return NextResponse.json({
      message: 'Email harus menggunakan gmail.com, outlook.com, atau yahoo.com',
      status: 400,
    })
  }

  if (!/^\d+$/.test(phone)) {
    return NextResponse.json({ message: 'Nomor telepon harus berupa angka saja' }, { status: 400 })
  }

  const date = Date.parse(dob)
  if (isNaN(date)) {
    return NextResponse.json({ message: 'Format tanggal lahir tidak valid (YYYY-MM-DD)' }, { status: 400 })
  }

  await connectDB()

  const existing = await User.findOne({ email })
  if (existing) {
    return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  await User.create({
    fullName,
    name,
    dob,
    phone,
    email,
    password: hashed,
  })

  return NextResponse.json({ success: true })
}
