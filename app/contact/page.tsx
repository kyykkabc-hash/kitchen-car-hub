"use client";

import { useState } from "react";

const CONTACT_TYPES = [
  "出店募集情報について",
  "イベント掲載について",
  "その他",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "15px",
  boxSizing: "border-box",
  marginTop: "6px",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#374151",
  marginBottom: "16px",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: CONTACT_TYPES[0],
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('送信失敗');
      setSubmitted(true);
    } catch {
      setError("送信に失敗しました。しばらくしてから再度お試しください。");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <a href="/" style={{ color: "#f97316", fontWeight: "bold", textDecoration: "none", fontSize: "15px" }}>← ドコデル DOKODERU</a>
      </header>

      <main style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 24px" }}>
        {/* 装飾3丸 */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#f97316" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#facc15" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#4ade80" }} />
        </div>
        <h1 style={{ fontSize: "1.4rem", fontWeight: "bold", textAlign: "center", marginBottom: "32px" }}>お問い合わせ</h1>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <p style={{ fontSize: "16px", color: "#374151", fontWeight: "bold" }}>お問い合わせを受け付けました。</p>
            <p style={{ fontSize: "15px", color: "#6b7280", marginTop: "8px" }}>ありがとうございます。</p>
            <a href="/" style={{ display: "inline-block", marginTop: "24px", color: "#f97316", textDecoration: "underline", fontSize: "14px" }}>トップに戻る</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: "6px", padding: "12px", marginBottom: "20px", fontSize: "14px" }}>
                {error}
              </div>
            )}

            <label style={labelStyle}>
              名前 <span style={{ color: "#ef4444" }}>*</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="例：山田 太郎"
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              メールアドレス <span style={{ color: "#ef4444" }}>*</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="例：example@mail.com"
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              お問い合わせ種別
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
              >
                {CONTACT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label style={labelStyle}>
              メッセージ <span style={{ color: "#ef4444" }}>*</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="お問い合わせ内容をご記入ください"
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: loading ? "#fed7aa" : "#f97316",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "8px",
                fontFamily: "inherit",
              }}
            >
              {loading ? "送信中..." : "送信する"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
