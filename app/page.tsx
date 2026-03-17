import Image from "next/image";
import EventFilter from "./EventFilter";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Image src="/logo.png" alt="ドコデル DOKODERU" height={90} width={360} style={{ height: "90px", width: "auto" }} />
        <a
          href="/submit"
          style={{ background: "#F97316", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}
        >
          イベントを投稿する
        </a>
      </header>

      <section style={{ position: "relative", width: "100%", minHeight: "400px", backgroundImage: "url('/marche-hero.jpg.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.05)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "24px" }}>
          <h1 style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: "bold", color: "#fff", marginBottom: "12px", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>自分にぴったりの出店場所を探しましょう</h1>
          <p style={{ color: "#ffffff", marginBottom: "28px", fontSize: "clamp(13px, 2vw, 16px)", textShadow: "0 1px 6px rgba(0,0,0,0.9)", fontWeight: "bold" }}>マルシェ・イベントの出店募集情報をリアルタイムで集約</p>
          <a
            href="/submit"
            style={{ background: "#F97316", color: "#fff", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            イベントを投稿する
          </a>
        </div>
      </section>

      <EventFilter />

      <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "24px", textAlign: "center", color: "#6b7280", fontSize: "13px" }}>
        © 2026 ドコデル DOKODERU
      </footer>
    </div>
  );
}
