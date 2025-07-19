// components/AdminNavbar.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from '../../lib/session'

export default async function AdminNavbar() {
  const session = await getSession()

  if (!session) return null // Tidak tampil jika belum login

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="text-2xl font-extrabold text-emerald-600 tracking-wide hover:opacity-90 transition"
          >
            Qurban<span className="text-gray-800">Qu</span>{' '}
            <span className="text-sm font-normal text-gray-500">Admin</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/api/logout"
              className="text-sm text-red-600 font-medium hover:underline"
            >
              Logout
            </Link>

            <Link href="/admin/profile">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:ring hover:ring-emerald-300 transition">
                <Image
                  src="/static/default-profile.png" // default image
                  alt="Profil Admin"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
