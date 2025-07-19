'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [challenge, setChallenge] = useState({ question: '', answer: 0 })
  const [userAnswer, setUserAnswer] = useState('')
  const [loginError, setLoginError] = useState('')
  const [captchaError, setCaptchaError] = useState(false)

  useEffect(() => {
    const a = Math.floor(Math.random() * 10 + 1)
    const b = Math.floor(Math.random() * 10 + 1)
    setChallenge({ question: `Berapa hasil dari ${a} x ${b}?`, answer: a * b })
  }, [])

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setCaptchaError(false)

    if (!validateEmail(email)) {
      setLoginError('Email harus menggunakan @gmail.com, @yahoo.com, atau @outlook.com')
      return
    }

    if (parseInt(userAnswer) !== challenge.answer) {
      setCaptchaError(true)
      return
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setLoginError('Email atau password salah.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-extrabold text-center text-emerald-600 mb-6">Masuk Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
              placeholder="contoh@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{challenge.question}</label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded-md shadow-sm"
              required
            />
            {captchaError && (
              <p className="text-sm text-red-600 mt-1">Jawaban captcha salah, coba lagi.</p>
            )}
          </div>

          {loginError && <p className="text-sm text-red-600">{loginError}</p>}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition">
            Login
          </button>

          <div className="flex justify-between text-sm text-gray-600">
            <Link href="/register" className="text-emerald-600 hover:underline">
              Belum punya akun?
            </Link>
            <Link href="/forgot-password" className="text-emerald-600 hover:underline">
              Lupa password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
