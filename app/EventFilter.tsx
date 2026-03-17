"use client";

import { useState } from "react";

const REGIONS = [
  { name: "北海道", prefs: ["北海道"] },
  { name: "東北", prefs: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: "関東", prefs: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県", "山梨県"] },
  { name: "北信越", prefs: ["新潟県", "富山県", "石川県", "福井県", "長野県"] },
  { name: "東海", prefs: ["愛知県", "静岡県", "三重県", "岐阜県"] },
  { name: "関西", prefs: ["大阪府", "兵庫県", "京都府", "滋賀県", "奈良県", "和歌山県"] },
  { name: "中国", prefs: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"] },
  { name: "四国", prefs: ["徳島県", "香川県", "愛媛県", "高知県"] },
  { name: "九州", prefs: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県"] },
  { name: "沖縄", prefs: ["沖縄県"] },
];

type VendorType = "kitchen_car" | "tent" | "both";

const EVENTS: {
  pref: string;
  title: string;
  location: string;
  dates: string;
  detail: string;
  deadline: string;
  application_deadline?: string;
  applyUrl: string;
  siteUrl: string;
  vendor_type: VendorType;
}[] = [
  {
    pref: "埼玉県",
    title: "埼玉県農林公園フリーマーケット",
    location: "埼玉県深谷市",
    dates: "📅 3月15日・4月5日・4月19日・5月3日・5月17日",
    detail: "🕐 9:00〜14:00　💰 1区画2,000円",
    deadline: "⏰ 募集締切：当日受付",
    applyUrl: "https://fleamarket.or.jp/form/email.html",
    siteUrl: "https://fleamarket.or.jp/nourin.html",
    vendor_type: "both",
  },
  {
    pref: "東京都",
    title: "東京ハンドメイドマルシェ2026春",
    location: "東京都文京区・東京ドームシティ プリズムホール",
    dates: "📅 4月18日(土)・4月19日(日)　いずれか1日",
    detail: "🕐 10:00〜17:00　💰 1ブース15,800円（税込）",
    deadline: "⏰ キャンセル待ち受付中（4月5日まで）",
    application_deadline: "2026-04-05",
    applyUrl: "https://tokyo.handmade-marche.jp/entry/",
    siteUrl: "https://tokyo.handmade-marche.jp/",
    vendor_type: "tent",
  },
  {
    pref: "東京都",
    title: "豊洲場外マルシェ",
    location: "東京都江東区・ミチノテラス豊洲（ゆりかもめ市場前駅直結）",
    dates: "📅 毎月第3土曜日　次回：3月21日",
    detail: "🛒 雑貨・食品・農産物・キッチンカー等　随時募集中",
    deadline: "⏰ 随時受付中（フォームから問い合わせ）",
    applyUrl: "https://toyosu-jyogai-marche.com/vender.html",
    siteUrl: "https://toyosu-jyogai-marche.com/",
    vendor_type: "both",
  },
  {
    pref: "東京都",
    title: "ヒルズマルシェ（赤坂アークヒルズ）",
    location: "東京都港区・赤坂アークヒルズ アーク・カラヤン広場",
    dates: "📅 毎週土曜日　10:00〜14:00",
    detail: "💰 売上歩合制：食品12%・雑貨15%（最低3,000円）",
    deadline: "⏰ 毎月2か月先分を一斉募集（2〜3週間で締切）",
    application_deadline: "2026-03-20",
    applyUrl: "https://marche.nougyou.tv/entry/",
    siteUrl: "https://marche.nougyou.tv/",
    vendor_type: "kitchen_car",
  },
];

function VendorIcons({ type }: { type: VendorType }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "10px" }}>
      {(type === "kitchen_car" || type === "both") && (
        <span style={{ display: "flex", alignItems: "center", gap: "4px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "20px", padding: "3px 10px", fontSize: "12px", color: "#ea580c", fontWeight: "bold" }}>
          <img src="/icons/kitchen-car.svg" alt="キッチンカー" width={20} height={20} />
          キッチンカー
        </span>
      )}
      {(type === "tent" || type === "both") && (
        <span style={{ display: "flex", alignItems: "center", gap: "4px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "20px", padding: "3px 10px", fontSize: "12px", color: "#ea580c", fontWeight: "bold" }}>
          <img src="/icons/tent.svg" alt="テント出店" width={20} height={20} />
          テント出店
        </span>
      )}
    </div>
  );
}

function EventCard({ e, urgent = false }: { e: typeof EVENTS[0]; urgent?: boolean }) {
  return (
    <div style={{
      border: urgent ? "2px solid #dc2626" : "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "20px",
      background: urgent ? "#fff5f5" : "#fff",
    }}>
      <VendorIcons type={e.vendor_type} />
      <h3 style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "4px" }}>{e.title}</h3>
      <p style={{ color: "#6b7280", fontSize: "13px" }}>{e.location}</p>
      <p style={{ marginTop: "8px", fontSize: "14px" }}>{e.dates}</p>
      <p style={{ fontSize: "14px" }}>{e.detail}</p>
      <p style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px" }}>{e.deadline}</p>
      <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <a href={e.applyUrl} target="_blank" style={{ background: urgent ? "#dc2626" : "#F97316", color: "#fff", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
          応募する
        </a>
        <a href={e.siteUrl} target="_blank" style={{ border: `1px solid ${urgent ? "#dc2626" : "#F97316"}`, color: urgent ? "#dc2626" : "#F97316", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontSize: "14px" }}>
          公式サイト
        </a>
      </div>
    </div>
  );
}

export default function EventFilter() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);

  const regionPrefs = selectedRegion
    ? (REGIONS.find((r) => r.name === selectedRegion)?.prefs ?? [])
    : [];

  // フィルタロジック
  const filtered = EVENTS.filter((e) => {
    if (selectedPrefectures.length > 0) return selectedPrefectures.includes(e.pref);
    if (selectedRegion) return regionPrefs.includes(e.pref);
    return true;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const in7days = new Date(today);
  in7days.setDate(today.getDate() + 7);
  const urgentEvents = (selectedRegion || selectedPrefectures.length > 0)
    ? filtered.filter((e) => {
        if (!e.application_deadline) return false;
        const d = new Date(e.application_deadline);
        return d >= today && d <= in7days;
      })
    : [];

  // エリアラベル生成
  const areaLabel = selectedPrefectures.length > 0
    ? selectedPrefectures.join("・")
    : selectedRegion ?? "";

  const handleRegionClick = (regionName: string) => {
    if (selectedRegion === regionName) {
      setSelectedRegion(null);
      setSelectedPrefectures([]);
    } else {
      setSelectedRegion(regionName);
      setSelectedPrefectures([]);
    }
  };

  const handlePrefClick = (pref: string) => {
    setSelectedPrefectures((prev) => {
      const next = prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref];
      return next;
    });
  };

  return (
    <>
      <style>{`
        .region-scroll::-webkit-scrollbar { display: none; }
        .region-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section style={{ padding: "28px 0 0", maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", padding: "0 16px" }}>エリアから探す</h2>

        {/* 選択中サマリー */}
        {areaLabel ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 16px 10px", background: "#fff7ed", border: "1px solid #F97316", borderRadius: "8px", padding: "8px 12px" }}>
            <span style={{ fontSize: "13px", color: "#ea580c", fontWeight: "bold" }}>🔍 {areaLabel}</span>
            <button
              onClick={() => { setSelectedRegion(null); setSelectedPrefectures([]); }}
              style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "20px", cursor: "pointer", lineHeight: 1, padding: "0 0 0 8px" }}
            >×</button>
          </div>
        ) : (
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: "0 16px 10px" }}>地方をタップすると都道府県が表示されます</p>
        )}

        {/* 地方タブ（横スクロール） */}
        <div className="region-scroll" style={{ display: "flex", overflowX: "auto", gap: "8px", padding: "0 16px 12px" }}>
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region.name;
            return (
              <button
                key={region.name}
                onClick={() => handleRegionClick(region.name)}
                style={{
                  flexShrink: 0,
                  height: "44px",
                  padding: "0 18px",
                  borderRadius: "22px",
                  border: isSelected ? "none" : "1.5px solid #d1d5db",
                  background: isSelected ? "#F97316" : "#f9fafb",
                  color: isSelected ? "#fff" : "#374151",
                  fontWeight: isSelected ? "bold" : "normal",
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {region.name}
              </button>
            );
          })}
        </div>

        {/* 都道府県グリッド */}
        {regionPrefs.length > 0 && (
          <div style={{ padding: "12px 16px", background: "#fff7ed", borderTop: "1px solid #fed7aa", borderBottom: "1px solid #fed7aa" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {regionPrefs.map((pref) => {
                // selectedPrefectures が空 → 地方全体選択中 → 全ボタンオレンジ
                const active = selectedPrefectures.length === 0 || selectedPrefectures.includes(pref);
                return (
                  <button
                    key={pref}
                    onClick={() => handlePrefClick(pref)}
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      border: active ? "none" : "1.5px solid #F97316",
                      background: active ? "#F97316" : "#fff",
                      color: active ? "#fff" : "#ea580c",
                      fontWeight: active ? "bold" : "normal",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 締切間近セクション */}
      {urgentEvents.length > 0 && (
        <section style={{ padding: "24px 16px 16px", maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "#dc2626" }}>
            締切間近の出店募集{areaLabel ? `（${areaLabel}）` : ""} 🔥
            <span style={{ fontSize: "13px", fontWeight: "normal", color: "#9ca3af", marginLeft: "8px" }}>{urgentEvents.length}件</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {urgentEvents.map((e, i) => <EventCard key={i} e={e} urgent />)}
          </div>
        </section>
      )}

      {/* 出店募集一覧 */}
      <section style={{ padding: "24px 16px 48px", maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
          新着の出店募集{areaLabel ? `（${areaLabel}）` : ""}
          <span style={{ fontSize: "13px", fontWeight: "normal", color: "#9ca3af", marginLeft: "8px" }}>{filtered.length}件</span>
        </h2>
        {filtered.length === 0 ? (
          <p style={{ color: "#6b7280", padding: "32px 0", textAlign: "center" }}>このエリアの募集情報は現在ありません。</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((e, i) => <EventCard key={i} e={e} />)}
          </div>
        )}
      </section>
    </>
  );
}
