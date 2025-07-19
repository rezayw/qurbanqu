'use client'
import '../../globals.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function UploadPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('KAMBING')
  const [contact, setContact] = useState('')
  const [harga, setHarga] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('contact', contact)
    formData.append('harga', harga)
    if (image) formData.append('image', image)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      alert('❌ Gagal mengupload iklan. Coba lagi.')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-qgreen mb-6 text-center">➕ Tambah Iklan Hewan Qurban</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Judul Iklan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />

        <textarea
          placeholder="Deskripsi lengkap..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border rounded px-4 py-2"
          rows={4}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="KAMBING">🐐 KAMBING</option>
          <option value="SAPI">🐄 SAPI</option>
          <option value="DOMBA">🐏 DOMBA</option>
          <option value="KERBAU">🐃 KERBAU</option>
        </select>

        <input
          type="number"
          placeholder="Harga (Rp)"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />

        <input
          type="text"
          placeholder="Nomor WhatsApp (628xxxx)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) setImage(e.target.files[0])
          }}
          required
          className="border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="btn-primary text-center"
        >
          🚀 Upload Iklan
        </button>
      </form>
    </div>
  )
}
