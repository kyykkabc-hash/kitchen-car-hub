import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, category, message } = body

    // Supabaseクライアントを直接生成
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{ name, email, category, message }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Resendでメール送信
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: mailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kyykkabc@gmail.com',
      subject: `【ドコデル】お問い合わせ：${category}`,
      text: `名前：${name}\nメール：${email}\n種別：${category}\n\nメッセージ：\n${message}`
    })

    if (mailError) {
      console.error('Resend error:', mailError)
    }

    return NextResponse.json({ success: true })

  } catch (e) {
    console.error('Unexpected error:', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
