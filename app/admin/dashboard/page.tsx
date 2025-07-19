// app/(admin)/dashboard/page.tsx
import { Ad } from '../../../models/ad'
import { connectDB } from '../../../lib/db'
import { verifyUserFromCookie } from '../../../lib/auth'
import Link from 'next/link'
import AdList from '../AdList'
import Image from 'next/image'

export default async function AdminDashboard() {
  const user = await verifyUserFromCookie()

  if (!user) {
    return (
      <div className="p-10 text-center text-red-600">
        Akses ditolak. Silakan{' '}
        <Link href="/login" className="underline text-blue-600">
          login
        </Link>{' '}
        terlebih dahulu.
      </div>
    )
  }

  try {
    await connectDB()
    const rawAds = await Ad.find().sort({ createdAt: -1 })
    const ads = rawAds.map((ad) => ({
      _id: ad._id.toString(),
      title: ad.title,
      description: ad.description,
      category: ad.category,
      contact: ad.contact,
      imageUrl: ad.imageUrl,
      createdAt: ad.createdAt?.toISOString?.(),
    }))

    return (
      <div className="min-h-screen bg-gray-50">
        {/* HERO */}
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src="/static/hero-sapi-2.png" // simpan gambar di /public/dashboard-hero.jpg
            alt="Dashboard Hero"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold">Selamat Datang, Admin!</h1>
            <p className="mt-2 text-lg md:text-xl">Kelola semua iklan qurban dengan mudah</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 max-w-5xl mx-auto">
          {/* Tombol Aksi */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-qgreen">📋 Dashboard Admin</h2>
            <div className="flex gap-4">
              <Link href="/admin/upload">
                <button className="bg-qgreen text-white px-5 py-2 rounded hover:bg-green-700 transition">
                  ➕ Tambah Iklan
                </button>
              </Link>
            </div>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white shadow rounded-xl p-6 text-center border border-gray-100">
              <h3 className="text-gray-600">Total Iklan</h3>
              <p className="text-3xl font-bold text-emerald-600">{ads.length}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center border border-gray-100">
              <h3 className="text-gray-600">Akun</h3>
              <p className="text-xl font-semibold text-blue-500">{user.email}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center border border-gray-100">
              <h3 className="text-gray-600">Tanggal</h3>
              <p className="text-xl text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Daftar Iklan */}
          {ads.length === 0 ? (
            <p className="text-gray-500">Belum ada iklan.</p>
          ) : (
            <AdList ads={ads} />
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('❌ Gagal mengambil iklan:', error)
    return (
      <div className="p-10 text-center text-red-600">
        Gagal mengambil data iklan.
      </div>
    )
  }
}
