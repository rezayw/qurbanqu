'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AdCard({ ad }: { ad: any }) {
  return (
    <div
      onClick={() => {
        window.open(`/ads/${ad._id}`, '_self')
      }}
      className="relative cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200"
    >
      <Image
        src={ad.imageUrl}
        alt={ad.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{ad.title}</h3>
        <p className="text-sm text-gray-500 italic mb-1">Kategori: {ad.category}</p>
        <p className="text-base text-green-700 font-bold">
          Rp {Number(ad.harga).toLocaleString('id-ID')}
        </p>
      </div>

      {/* Tombol WhatsApp Bulat dengan Gambar dari /public */}
      <Link
        href={`https://wa.me/${ad.contact}?text=Halo, saya tertarik dengan hewan qurban bernama ${ad.title}`}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg transition-all flex items-center justify-center"
      >
        <Image
          src="/logo/whatsapp.png" // Pastikan gambar ini ada di /public/whatsapp.png
          alt="WhatsApp"
          width={20}
          height={20}
        />
      </Link>
    </div>
  )
}
