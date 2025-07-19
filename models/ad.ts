import mongoose from 'mongoose'

const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  contact: String,
  imageUrl: String,
  harga: Number, // ✅ Tambahan harga
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Ad = mongoose.models.Ad || mongoose.model('Ad', AdSchema)

export type AdItem = {
  _id: string
  title: string
  description: string
  category: string
  contact: string
  imageUrl: string
  harga: number
}
