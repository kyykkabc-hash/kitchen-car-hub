import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function NewsPage() {
  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, published_at, title, url")
    .eq("is_visible", true)
    .order("published_at", { ascending: false });

  return (
    <div style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <a href="/" style={{ color: "#f97316", fontWeight: "bold", textDecoration: "none", fontSize: "15px" }}>← ドコデル DOKODERU</a>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937", marginBottom: "24px" }}>お知らせ</h1>

        {!announcements || announcements.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "14px" }}>お知らせはありません。</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {announcements.map((item, i) => (
              <li key={item.id}>
                {i > 0 && <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />}
                <div style={{ padding: "16px 0", display: "flex", gap: "16px", alignItems: "baseline" }}>
                  <span style={{ fontWeight: "bold", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                    {item.published_at ? new Date(item.published_at).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }) : ""}
                  </span>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "#f97316", textDecoration: "none" }}>
                      {item.title}
                    </a>
                  ) : (
                    <span style={{ fontSize: "14px", color: "#1f2937" }}>{item.title}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
