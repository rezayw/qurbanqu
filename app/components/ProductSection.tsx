'use client'

import { useState } from 'react'
import type { AdItem } from '../../models/ad'
import AdCard from './AdCard'

export default function ProductSection({ ads }: { ads: AdItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = ['Semua', 'Sapi', 'Kambing', 'Domba', 'Kerbau']
  const filteredAds = selectedCategory && selectedCategory !== 'Semua'
    ? ads.filter(ad => ad.category.toLowerCase() === selectedCategory.toLowerCase())
    : ads

  return (
    <section id="produk" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="section-title">🐐 Produk Hewan Qurban</h2>
      <p className="section-subtitle mb-6">
        Pilih hewan qurban terbaik dari peternak terpercaya. Harga terjangkau dan mudah dipesan via WhatsApp.
      </p>

      {/* ✅ Filter Kategori */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat || (cat === 'Semua' && !selectedCategory)
                ? 'bg-qgreen text-white'
                : 'border-qgreen text-qgreen hover:bg-qgreen hover:text-white'
            } transition`}
            onClick={() => setSelectedCategory(cat === 'Semua' ? '' : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredAds.length === 0 ? (
          <p className="col-span-4 text-center text-gray-500">Tidak ada produk untuk kategori ini.</p>
        ) : (
          filteredAds.map((ad) => <AdCard key={ad._id} ad={ad} />)
        )}
      </div>
    </section>
  )
}
