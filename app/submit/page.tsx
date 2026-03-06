"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

type VendorType = "kitchen_car" | "tent" | "both";

const VENDOR_OPTIONS: { value: VendorType; label: string; icon: string }[] = [
  { value: "kitchen_car", label: "キッチンカー", icon: "/icons/kitchen-car.svg" },
  { value: "tent", label: "テント出店", icon: "/icons/tent.svg" },
  { value: "both", label: "両方", icon: "" },
];

const PREFECTURES = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
  "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
  "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
  "熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location_name: "",
    prefecture: "",
    event_url: "",
    application_url: "",
  });
  const [vendorType, setVendorType] = useState<VendorType>("both");
  const [vendorManual, setVendorManual] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVendorChange = (value: VendorType) => {
    setVendorType(value);
    setVendorManual(true);
  };

  const handleDetect = async () => {
    if (!form.description && !form.event_url) return;
    setDetecting(true);
    try {
      const res = await fetch("/api/detect-vendor-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: form.description, event_url: form.event_url }),
      });
      const data = await res.json();
      setVendorType(data.vendor_type as VendorType);
      setVendorManual(false);
    } catch (e) {
      console.error("AI detect error:", e);
    }
    setDetecting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let finalVendorType = vendorType;

    // 手動選択していない場合はAIで自動判定
    if (!vendorManual && (form.description || form.event_url)) {
      try {
        const res = await fetch("/api/detect-vendor-type", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: form.description, event_url: form.event_url }),
        });
        const data = await res.json();
        finalVendorType = data.vendor_type as VendorType;
      } catch {
        // 失敗時はデフォルト値をそのまま使用
      }
    }

    const { error } = await supabase.from("events").insert([{ ...form, vendor_type: finalVendorType }]);

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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff7ed" }}>
        <div style={{ textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#ea580c", marginBottom: "8px" }}>投稿が完了しました</h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>イベント情報を受け付けました。</p>
          <a href="/" style={{ color: "#F97316", textDecoration: "underline", fontSize: "14px" }}>トップページに戻る</a>
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

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <a href="/" style={{ fontSize: "18px", fontWeight: "bold", color: "#F97316", textDecoration: "none" }}>← ドコデル DOKODERU</a>
      </header>

      <main style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#ea580c", marginBottom: "8px" }}>イベントを投稿する</h1>
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
            イベント概要URL
            <input name="event_url" value={form.event_url} onChange={handleChange} type="url" placeholder="例：https://example.com/event" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            出展募集応募フォームURL
            <input name="application_url" value={form.application_url} onChange={handleChange} type="url" placeholder="例：https://example.com/apply" style={inputStyle} />
          </label>

          {/* 出店タイプ */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "#374151" }}>
                出店タイプ <span style={{ color: "#ef4444" }}>*</span>
              </span>
              {(form.description || form.event_url) && (
                <button
                  type="button"
                  onClick={handleDetect}
                  disabled={detecting}
                  style={{ fontSize: "12px", padding: "4px 12px", background: detecting ? "#fed7aa" : "#fff7ed", border: "1px solid #F97316", color: "#ea580c", borderRadius: "6px", cursor: detecting ? "not-allowed" : "pointer", fontWeight: "bold" }}
                >
                  {detecting ? "判定中..." : "✨ AIで自動判定"}
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {VENDOR_OPTIONS.map((opt) => {
                const active = vendorType === opt.value;
                return (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "10px 16px", borderRadius: "8px", cursor: "pointer",
                      border: `2px solid ${active ? "#F97316" : "#d1d5db"}`,
                      background: active ? "#fff7ed" : "#fff",
                      fontWeight: active ? "bold" : "normal",
                      color: active ? "#ea580c" : "#374151",
                      transition: "all 0.15s",
                    }}
                  >
                    <input
                      type="radio"
                      name="vendor_type"
                      value={opt.value}
                      checked={active}
                      onChange={() => handleVendorChange(opt.value)}
                      style={{ display: "none" }}
                    />
                    {opt.icon && <img src={opt.icon} alt={opt.label} width={22} height={22} />}
                    {opt.label}
                  </label>
                );
              })}
            </div>
            {!vendorManual && (form.description || form.event_url) && (
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>
                ※ 投稿時にAIが説明・URLを読んで自動判定します。手動で選択するとそちらが優先されます。
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: loading ? "#fed7aa" : "#F97316", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}
          >
            {loading ? "送信中..." : "投稿する"}
          </button>
        </form>
      </main>
    </div>
  );
}
