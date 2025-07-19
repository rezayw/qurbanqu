import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '../../../../lib/db'
import { Ad } from '../../../../models/ad'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  await Ad.findByIdAndDelete(params.id)
  return NextResponse.redirect(new URL('/admin/dashboard', req.url))
}
