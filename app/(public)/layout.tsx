// app/(public)/layout.tsx
import '../globals.css'
import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import TawkButton from '../components/TawkButton'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast' // ✅ Tambahkan ini

export const metadata = {
  title: 'QurbanQu',
  description: 'Platform Qurban Islami',
  icons: {
    icon: '/logo/favicon.ico',
  },
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <TawkButton />
        <Footer />
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Ini penting */}
      </body>
    </html>
  )
}
