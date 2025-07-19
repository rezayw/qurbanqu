// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [session, setSession] = useState<any>(null)

  // Ambil session di client menggunakan fetch
  useEffect(() => {
  fetch('/api/session')
    .then((res) => res.json())
    .then((data) => {
      if (data?.user) {
        setSession(data.user)
      }
    })
    .catch((err) => console.error('Session fetch error:', err))
  }, [])


  const hideNavItems = pathname === '/login'

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-extrabold text-emerald-600 tracking-wide hover:opacity-90 transition"
          >
            Qurban<span className="text-gray-800">Qu</span>
          </Link>

          <div className="flex items-center space-x-6">
            {!hideNavItems && (
              <>
                <Link href="#tentang" className="text-gray-700 font-medium hover:text-emerald-600 transition-colors">
                  Tentang
                </Link>
                <Link href="#produk" className="text-gray-700 font-medium hover:text-emerald-600 transition-colors">
                  Produk
                </Link>
                <Link href="#kontak" className="text-gray-700 font-medium hover:text-emerald-600 transition-colors">
                  Kontak
                </Link>
              </>
            )}

            {session ? (
              <Link
                href="/admin/dashboard"
                className="px-4 py-1.5 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition duration-300"
              >
                Pasang Iklan
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition duration-300"
              >
                Ayo Berkurban!
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
