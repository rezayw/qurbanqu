'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type User = {
  name: string
  email: string
  phone: string
  dob: string
  fullName: string
  photoUrl?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    name: '',
    phone: '',
    dob: '',
    currentPassword: '',
    newPassword: '',
    photo: null as File | null,
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        setForm({
          fullName: data.fullName || '',
          name: data.name || '',
          phone: data.phone || '',
          dob: data.dob || '',
          currentPassword: '',
          newPassword: '',
          photo: null,
        })
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'photo' && files?.[0]) {
      const file = files[0]
      const validTypes = ['image/jpeg', 'image/png']
      const maxSizeMB = 1

      if (!validTypes.includes(file.type)) {
        toast.error('Format file harus JPG atau PNG')
        return
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error('Ukuran file maksimal 1MB')
        return
      }

      setForm(prev => ({ ...prev, photo: file }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('fullName', form.fullName)
    formData.append('name', form.name)
    formData.append('phone', form.phone)
    formData.append('dob', form.dob)
    if (form.currentPassword) formData.append('currentPassword', form.currentPassword)
    if (form.newPassword) formData.append('newPassword', form.newPassword)
    if (form.photo) formData.append('photo', form.photo)

    const res = await fetch('/api/profile/update', {
      method: 'POST',
      body: formData,
    })

    setLoading(false)
    if (res.ok) {
      toast.success('Profil berhasil diperbarui')
      const updated = await res.json()
      setUser(updated)
      setForm(f => ({ ...f, currentPassword: '', newPassword: '', photo: null }))
    } else {
      const { error } = await res.json()
      toast.error(error || 'Gagal memperbarui profil')
    }
  }

  const handleLogout = async () => {
    const res = await fetch('/api/logout', { method: 'POST' })
    if (res.ok) {
      toast.success('Berhasil logout')
      window.location.href = '/login'
    } else {
      toast.error('Gagal logout')
    }
  }

  if (!user) return <div className="p-6 text-center">Memuat profil...</div>

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-emerald-700 text-center mb-6">Profil Admin</h1>

      <div className="flex justify-center mb-4">
        <img
          src={form.photo ? URL.createObjectURL(form.photo) : user.photoUrl || '/static/default-profile.png'}
          alt="Foto Profil"
          className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400"
        />
      </div>

      <div className="grid gap-4">
        <InputField label="Nama Lengkap" name="fullName" value={form.fullName} onChange={handleChange} />
        <InputField label="Nama Pengguna" name="name" value={form.name} onChange={handleChange} />
        <InputField label="Email" value={user.email} disabled />
        <InputField label="Nomor Telepon" name="phone" value={form.phone} onChange={handleChange} />
        <InputField label="Tanggal Lahir" name="dob" value={form.dob} onChange={handleChange} type="date" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil</label>
          <input
            type="file"
            name="photo"
            accept="image/jpeg, image/png"
            onChange={handleChange}
          />
        </div>

        <hr className="my-2" />

        <InputField
          label="Password Sekarang"
          name="currentPassword"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
        />
        <InputField
          label="Password Baru"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
}: {
  label: string
  name?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  )
}
