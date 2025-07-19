// app/(admin)/dashboard/AdList.tsx
'use client'

import Link from 'next/link'

export default function AdList({ ads }: { ads: any[] }) {
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm('Yakin hapus iklan ini?')) {
      e.preventDefault()
    }
  }

  return (
    <ul className="space-y-4">
      {ads.map((ad) => (
        <li key={ad._id.toString()} className="card border p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-qgreen">{ad.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
          <div className="flex justify-between items-center">
            <Link
              href={`/ads/${ad._id.toString()}`}
              className="text-blue-600 hover:underline text-sm"
            >
              🔍 Lihat Detail
            </Link>
            <form action={`/api/ads/${ad._id}`} method="POST">
              <button
                type="submit"
                className="text-red-500 text-sm hover:underline"
                onClick={handleDeleteClick}
              >
                ❌ Hapus
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  )
}
