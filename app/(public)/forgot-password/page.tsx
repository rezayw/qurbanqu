'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')

  const allowedDomains = ['gmail.com', 'yahoo.com'] // ini sebaiknya juga bisa diambil dari server, tapi untuk client-side hardcoded tidak masalah

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Format email tidak valid'
    }

    const domain = value.split('@')[1]
    if (!allowedDomains.includes(domain)) {
      return `Hanya email dari ${allowedDomains.join(', ')} yang diperbolehkan`
    }

    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateEmail(email)
    if (validationError) {
      setEmailError(validationError)
      return
    }

    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setMessage('🔗 Link reset telah dikirim ke email Anda.')
      setError('')
    } else {
      setMessage('')
      setError(data.message || 'Terjadi kesalahan.')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    const validationError = validateEmail(value)
    setEmailError(validationError)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-emerald-600 mb-4">Lupa Password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="contoh@gmail.com"
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                emailError
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-emerald-400'
              }`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition disabled:opacity-50"
            disabled={emailError !== ''}
          >
            Kirim Link Reset
          </button>

          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </section>
  )
}
