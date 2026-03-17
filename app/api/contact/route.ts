import { Resend } from 'resend'
import { supabase } from '../../../lib/supabase'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, category, message } = body

    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{ name, email, contact_type: category, message }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    const { data: mailData, error: mailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kyykkabc@gmail.com',
      subject: `【ドコデル】お問い合わせ：${category}`,
      text: `名前：${name}\nメール：${email}\n種別：${category}\n\nメッセージ：\n${message}`,
    })

    if (mailError) {
      console.error('Resend error:', mailError)
      // メール失敗してもSupabase保存は成功しているのでOKとする
    }

    console.log('Mail sent:', mailData)
    return NextResponse.json({ success: true })

  } catch (e) {
    console.error('Unexpected error:', e)
    return NextResponse.json({ error: 'unexpected error' }, { status: 500 })
  }
}
