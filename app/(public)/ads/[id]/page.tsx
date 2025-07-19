// app/(public)/ads/[id]/page.tsx
import { connectDB } from '../../../../lib/db'
import { Ad } from '../../../../models/ad'
import type { AdItem } from '../../../../models/ad'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function AdDetailPage({ params }: Props) {
  await connectDB()

  const adRaw = await Ad.findById(params.id).lean() as AdItem | null

  if (!adRaw) return notFound()

  const ad: AdItem = {
    _id: adRaw._id,
    title: adRaw.title,
    description: adRaw.description,
    category: adRaw.category,
    contact: adRaw.contact,
    imageUrl: adRaw.imageUrl,
    harga: adRaw.harga,
  }


  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Tombol kembali */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-block text-sm text-qgreen hover:underline font-medium"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* Konten Detail */}
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 grid md:grid-cols-2 gap-8">
        {/* Gambar */}
        <div>
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            width={600}
            height={400}
            className="rounded-lg w-full object-cover border"
          />
        </div>

        {/* Detail */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{ad.title}</h1>
            <p className="text-sm text-gray-500 mb-2">Kategori: {ad.category}</p>
            <p className="text-2xl text-red-600 font-extrabold mb-4">
              Rp {Number(ad.harga).toLocaleString('id-ID')}
            </p>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {ad.description}
            </div>
          </div>

          {/* Tombol WhatsApp */}
          <Link
            href={`https://wa.me/${ad.contact}?text=Halo, saya tertarik dengan hewan qurban ${ad.title}`}
            target="_blank"
            className="mt-6 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-md text-center shadow transition"
          >
            🟢 Pesan via WhatsApp
          </Link>
        </div>
      </div>
    </main>
  )
}
