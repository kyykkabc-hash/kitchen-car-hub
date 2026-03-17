import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, category, message } = body

  const { error } = await supabase
    .from('contacts')
    .insert([{ name, email, contact_type: category, message }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'kyykkabc@gmail.com',
    subject: `【ドコデル】お問い合わせ：${category}`,
    text: `名前：${name}\nメール：${email}\n種別：${category}\n\nメッセージ：\n${message}`,
  })

  return NextResponse.json({ success: true })
}
