'use client'

import { useEffect } from 'react'

export default function TawkButton() {
  useEffect(() => {
    const tawkURL = process.env.NEXT_PUBLIC_TAWK_URL
    console.log('Tawk.to script loading:', tawkURL)

    if (typeof window !== 'undefined' && tawkURL && !(window as any).Tawk_API) {
      const script = document.createElement('script')
      script.src = tawkURL
      script.async = true
      script.charset = 'UTF-8'
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
      console.log('Tawk.to script appended.')
    }
  }, [])

  return null
}
