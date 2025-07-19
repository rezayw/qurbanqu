'use server'

import { connectDB } from '../../lib/db'
import { Ad } from '../../models/ad'
import type { AdItem } from '../../models/ad'
import Link from 'next/link'
import Image from 'next/image'
import AboutMe from '../components/AboutMe'
import Contact from '../components/Contact'
import ProductSection from '../components/ProductSection' // ⬅️ client component

export default async function HomePage() {
  await connectDB()

  const adsRaw = await Ad.find().sort({ createdAt: -1 }).lean()

  const ads: AdItem[] = adsRaw.map((ad) => ({
    _id: ad._id?.toString?.() || '',
    title: ad.title || '',
    description: ad.description || '',
    category: ad.category || '',
    contact: ad.contact || '',
    imageUrl: ad.imageUrl || '',
    harga: ad.harga || 0,
  }))

  return (
    <main className="bg-gradient-to-br from-qcream via-qblue to-white text-[#1f2937]">
      {/* ✅ Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-qgreen mb-4">
            Menjual Sapi, Kambing, Domba, dan Kerbau
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Menyediakan berbagai jenis hewan ternak berkualitas untuk kebutuhan qurban Anda.
          </p>
          <Link href="#produk">
            <button className="btn-primary">Jelajahi Produk</button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/static/hero-sapi.png"
            alt="Hero Sapi"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* ✅ Produk dengan filter */}
      <ProductSection ads={ads} />

      {/* ✅ Tentang Kami */}
      <AboutMe />

      {/* ✅ Kontak */}
      <Contact />
    </main>
  )
}
