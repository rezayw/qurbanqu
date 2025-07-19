// models/user.ts
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName: String,
  name: String, // nama panggilan
  dob: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model('User', userSchema)
