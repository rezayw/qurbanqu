import '../globals.css'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AdminNavbar />
        {children}
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
