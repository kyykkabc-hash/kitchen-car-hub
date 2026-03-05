"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location_name: "",
    prefecture: "",
    organizer_name: "",
    contact_url: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("events").insert([form]);

    if (error) {
      console.error("Supabase insert error:", error);
      setError(`送信に失敗しました。(${error.message})`);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: "sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0fdf4" }}>
        <div style={{ textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#15803d", marginBottom: "8px" }}>投稿が完了しました</h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>イベント情報を受け付けました。</p>
          <a href="/" style={{ color: "#16a34a", textDecoration: "underline", fontSize: "14px" }}>トップページに戻る</a>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
    marginTop: "4px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#374151",
    marginBottom: "16px",
  };

  const PREFECTURES = [
    "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
    "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
    "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
    "熊本県","大分県","宮崎県","鹿児島県","沖縄県",
  ];

  return (
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <a href="/" style={{ fontSize: "18px", fontWeight: "bold", color: "#16a34a", textDecoration: "none" }}>← ドコデル DOKODERU</a>
      </header>

      <main style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#15803d", marginBottom: "8px" }}>イベントを投稿する</h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>出店募集イベントの情報を登録できます。</p>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: "6px", padding: "12px", marginBottom: "20px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>
            イベント名 <span style={{ color: "#ef4444" }}>*</span>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="例：春のマルシェ in 代々木公園" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            説明
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="イベントの概要や出店条件など" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
          </label>

          <label style={labelStyle}>
            開催日 <span style={{ color: "#ef4444" }}>*</span>
            <input name="event_date" value={form.event_date} onChange={handleChange} required type="date" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            都道府県 <span style={{ color: "#ef4444" }}>*</span>
            <select name="prefecture" value={form.prefecture} onChange={handleChange} required style={inputStyle}>
              <option value="">選択してください</option>
              {PREFECTURES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            会場名 <span style={{ color: "#ef4444" }}>*</span>
            <input name="location_name" value={form.location_name} onChange={handleChange} required placeholder="例：代々木公園イベント広場" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            主催者名 <span style={{ color: "#ef4444" }}>*</span>
            <input name="organizer_name" value={form.organizer_name} onChange={handleChange} required placeholder="例：株式会社〇〇 / 〇〇実行委員会" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            問い合わせURL
            <input name="contact_url" value={form.contact_url} onChange={handleChange} type="url" placeholder="https://..." style={inputStyle} />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: loading ? "#86efac" : "#16a34a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}
          >
            {loading ? "送信中..." : "投稿する"}
          </button>
        </form>
      </main>
    </div>
  );
}
