'use client'

import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'

const images = [
  {
    src: '/static/about-me-1.png',
    caption: 'Menjadi jembatan kebaikan antara peternak dan masyarakat.',
  },
  {
    src: '/static/about-me-2.png',
    caption: 'Kami hadir dengan semangat transparansi dan kemudahan ibadah Qurban.',
  },
  {
    src: '/static/about-me-3.png',
    caption: 'Memberdayakan UMKM peternak lokal demi keberkahan bersama.',
  },
]

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    loop: true,
  })

  return (
    <section id="tentang" className="mt-24 mb-20 from-green-50 via-white to-green-100 px-3 md:px-12 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Gambar slider */}
            <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
            {images.map((img, idx) => (
                <div key={idx} className="keen-slider__slide">
                <div className="relative w-full h-[300px]">
                    <Image src={img.src} alt={`slide-${idx}`} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm text-center p-3">
                    {img.caption}
                    </div>
                </div>
                </div>
            ))}
            </div>

        {/* Teks kanan */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">Tentang Kami</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            QurbanQu adalah platform Islami yang menghubungkan masyarakat
            dengan peternak lokal terpercaya. Kami berkomitmen menyediakan
            pengalaman berqurban yang mudah, aman, dan penuh keberkahan.
          </p>

          <div className="flex gap-2 mt-6">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === idx ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
