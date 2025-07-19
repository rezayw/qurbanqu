import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/db'
import { Ad } from '../../../models/ad'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  const formData = await req.formData()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const contact = formData.get('contact') as string
  const hargaRaw = formData.get('harga') as string
  const harga = Number(hargaRaw)
  const file = formData.get('image') as File

  if (!file || !file.name) {
    return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
  const uploadPath = path.join(process.cwd(), 'public/uploads', fileName)

  await fs.mkdir(path.dirname(uploadPath), { recursive: true })
  await fs.writeFile(uploadPath, buffer)

  const imageUrl = `/uploads/${fileName}`

  await connectDB()
  await Ad.create({
    title,
    description,
    category,
    contact,
    harga, // ✅ sudah ditambahkan
    imageUrl,
  })

  return NextResponse.json({ success: true })
}
