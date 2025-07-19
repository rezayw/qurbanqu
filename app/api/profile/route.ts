// app/api/profile/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '../../../lib/db'
import { verifyUserFromCookie } from '../../../lib/auth'
import { User } from '../../../models/user'
import path from 'path'
import fs from 'fs/promises'

export async function GET() {
  try {
    await connectDB()

    const user = await verifyUserFromCookie()
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const found = await User.findById(user.id).select('name fullName email phone dob photo')

    if (!found) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    return NextResponse.json({
      name: found.name,
      fullName: found.fullName,
      email: found.email,
      phone: found.phone,
      dob: found.dob,
      photo: found.photo || null,
    })
  } catch (err) {
    console.error('Profile fetch error:', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB()

    const user = await verifyUserFromCookie()
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()

    const fullName = formData.get('fullName')?.toString() || ''
    const phone = formData.get('phone')?.toString() || ''
    const dob = formData.get('dob')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    const file = formData.get('photo') as File | null

    // Validasi file
    let photoUrl = null
    if (file && typeof file === 'object') {
      if (file.size > 1024 * 1024) {
        return NextResponse.json({ message: 'Ukuran foto maksimal 1MB' }, { status: 400 })
      }
      const ext = path.extname(file.name).toLowerCase()
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return NextResponse.json({ message: 'Hanya format JPG/PNG yang diperbolehkan' }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const filePath = path.join(process.cwd(), 'public/uploads', filename)
      await fs.writeFile(filePath, buffer)

      photoUrl = `/uploads/${filename}`
    }

    const updateData: any = {
      fullName,
      phone,
      dob,
    }

    if (photoUrl) updateData.photo = photoUrl
    if (password) updateData.password = password // Diasumsikan sudah di-hash via middleware mongoose

    await User.findByIdAndUpdate(user.id, updateData)

    return NextResponse.json({ message: 'Profil berhasil diperbarui' })
  } catch (err) {
    console.error('Profile update error:', err)
    return NextResponse.json({ message: 'Gagal memperbarui profil' }, { status: 500 })
  }
}
