'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptPolicy, setAcceptPolicy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    // Validasi tambahan
    if (!acceptPolicy) {
      setError('Anda harus menyetujui Privacy Policy')
      return
    }

    if (!email.endsWith('.com')) {
      setError('Alamat email harus berakhiran .com')
      return
    }

    if (!/^08\d{8,12}$/.test(phone)) {
      setError('Nomor telepon tidak valid. Harus dimulai dengan 08 dan 10–14 digit.')
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    if (password !== confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        fullName,
        name: username,          // ubah dari "username" ke "name"
        dob,
        phone,
        email,
        password,
        confirmPassword,         // ✅ ini yang wajib ditambahkan
        acceptPolicy,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      router.push('/login')
    } else {
      const result = await res.json()
      setError(result?.message || 'Gagal mendaftar. Coba lagi.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-emerald-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 space-y-6 border border-emerald-200">
        <h1 className="text-3xl font-bold text-center text-emerald-700">Buat Akun</h1>
        <p className="text-sm text-gray-500 text-center">Silakan isi data lengkap Anda</p>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Nama Panggilan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="tel"
            placeholder="Nomor Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Alamat Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Ulangi Kata Sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />

          <div className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              id="policy"
              checked={acceptPolicy}
              onChange={(e) => setAcceptPolicy(e.target.checked)}
              className="mt-1 accent-emerald-600"
              required
            />
            <label htmlFor="policy" className="text-gray-700">
              Saya telah membaca dan menyetujui{' '}
              <a
                href="/privacy"
                target="_blank"
                className="text-emerald-600 underline hover:text-emerald-700"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={!acceptPolicy}
            className={`w-full py-2 rounded font-semibold transition ${
              acceptPolicy
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{' '}
          <a href="/login" className="text-emerald-600 hover:underline">
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  )
}
