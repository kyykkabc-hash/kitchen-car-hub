import EventFilter from "./EventFilter";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, published_at, title, url")
    .eq("is_visible", true)
    .order("published_at", { ascending: false });

  return (
    <div style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px", marginBottom: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Image src="/logo.png" alt="ドコデル DOKODERU" height={90} width={360} style={{ height: "90px", width: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "0.65rem", color: "#666", whiteSpace: "nowrap" }}>自分の周りの出店情報がLINEで届く</span>
          <a href="#">
            <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" style={{ height: "32px", width: "auto" }} />
          </a>
          <a href="/contact" style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textDecoration: "none",
            whiteSpace: "nowrap"
          }}>
            お問い合わせ
          </a>
        </div>
      </header>

      <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden" }}>
        <img
          src="/marche-hero.jpg.jpeg"
          alt="マルシェ風景"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block" }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.05)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 16px", zIndex: 10 }}>
          <h1 style={{ color: "white", fontSize: "1.5rem", whiteSpace: "nowrap", fontWeight: "bold", textShadow: "0 2px 6px rgba(0,0,0,0.9)", marginBottom: "8px" }}>
            ぴったりの出店場所を探そう
          </h1>
          <p style={{ color: "white", fontSize: "0.85rem", whiteSpace: "nowrap", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
            マルシェ・お祭りの出店情報をリアルタイム集約
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", textAlign: "center", zIndex: 10 }}>
          <p style={{ color: "white", fontSize: "0.7rem", textShadow: "0 1px 3px rgba(0,0,0,0.9)", marginBottom: "4px", fontWeight: "bold" }}>
            主催者の方へ
          </p>
          <a href="/submit" style={{ backgroundColor: "#f97316", color: "white", padding: "6px 14px", borderRadius: "9999px", fontWeight: "bold", fontSize: "0.75rem", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.5)", display: "inline-block" }}>
            イベントを投稿する →
          </a>
        </div>
      </div>

      <EventFilter />

      {/* 主催者セクション */}
      <section style={{
        backgroundColor: '#fff7ed',
        border: '2px solid #f97316',
        borderRadius: '12px',
        padding: '24px 16px',
        margin: '32px 16px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>
          マルシェ・イベントを開催している方へ
        </p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f97316', marginBottom: '8px' }}>
          主催者の方へ
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '16px' }}>
          出店募集情報を無料で掲載できます。<br />
          多くの出店者にリーチしましょう。
        </p>
        <a href="/submit" style={{
          backgroundColor: '#f97316',
          color: 'white',
          padding: '10px 24px',
          borderRadius: '9999px',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          イベントを掲載する →
        </a>
      </section>

      {/* お知らせセクション */}
      <section style={{ backgroundColor: "#fdf6ec", padding: "40px 16px", marginTop: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#f97316" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#facc15" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#4ade80" }} />
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>お知らせ</h2>
        </div>
        {announcements && announcements.length > 0 ? (
          announcements.map((item) => (
            <div key={item.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "12px 0", maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#f97316", marginBottom: "4px" }}>
                {item.published_at}
              </div>
              {item.url
                ? <a href={item.url} style={{ color: "#1d4ed8", textDecoration: "underline", fontSize: "0.9rem" }}>{item.title}</a>
                : <span style={{ fontSize: "0.9rem" }}>{item.title}</span>
              }
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.9rem" }}>お知らせはありません</p>
        )}
      </section>

      <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "24px", textAlign: "center", color: "#6b7280", fontSize: "13px" }}>
        © 2026 ドコデル DOKODERU
      </footer>
    </div>
  );
}
