import Image from "next/image";
import EventFilter from "./EventFilter";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Image src="/logo.png" alt="ドコデル DOKODERU" height={50} width={200} style={{ height: "50px", width: "auto" }} />
        <a
          href="/submit"
          style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}
        >
          イベントを投稿する
        </a>
      </header>

      <section style={{ background: "#f0fdf4", padding: "48px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#15803d", marginBottom: "12px" }}>自分にぴったりの出店場所を探しましょう</h1>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>マルシェ・イベントの出店募集情報をリアルタイムで集約</p>
        <a
          href="/submit"
          style={{ background: "#16a34a", color: "#fff", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}
        >
          イベントを投稿する
        </a>
      </section>

      <EventFilter />

      <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "24px", textAlign: "center", color: "#6b7280", fontSize: "13px" }}>
        © 2026 ドコデル DOKODERU
      </footer>
    </div>
  );
}
