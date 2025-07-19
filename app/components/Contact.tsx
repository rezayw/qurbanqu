'use client'

import React from 'react'
import Image from 'next/image'

export default function ContactSection() {
  return (
    <section id="kontak" className="mt-16 from-green-50 via-white to-green-100 px-4 md:px-12 py-0">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Konten Teks */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-qgreen">
            Hubungi QurbanQu
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kami siap membantu Anda untuk menunaikan ibadah qurban dengan mudah dan berkah. Jangan ragu menghubungi kami!
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Image src="/logo/email.png" alt="Email" width={24} height={24} />
              <a href="mailto:qurbanqu@example.com" className="hover:underline">
                qurbanqu@example.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/logo/phone.png" alt="Telepon" width={24} height={24} />
              <a href="tel:+6281234567990" className="hover:underline">
                +62 812-3456-7990
              </a>
            </div>
          </div>

          <a
            href="https://wa.me/6281234567990"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full shadow transition mt-4"
          >
            <Image src="/logo/whatsapp.png" alt="WhatsApp" width={20} height={20} />
            Chat via WhatsApp
          </a>
        </div>

        {/* Gambar Ilustrasi */}
        <div className="flex justify-center">
          <Image
            src="/static/contact.png"
            alt="Ilustrasi Kontak"
            width={400}
            height={400}
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  )
}
