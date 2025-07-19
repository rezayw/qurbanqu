import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
  
  await resend.emails.send({
    from: 'QurbanQu <noreply@qurbanqu.com>',
    to,
    subject: 'Reset Password',
    html: `<p>Klik link berikut untuk reset password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  })
}
