import bcrypt from 'bcryptjs'

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10)
}

export function comparePassword(input: string, hashed: string) {
  return bcrypt.compareSync(input, hashed)
}
