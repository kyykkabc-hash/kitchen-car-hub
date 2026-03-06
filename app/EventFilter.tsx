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

export default function EventFilter() {
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (region: typeof REGIONS[0]) => {
    if (selectedRegion === region.name) {
      setSelectedRegion(null);
      setSelectedPrefs([]);
    } else {
      setSelectedRegion(region.name);
      setSelectedPrefs([]);
    }
  };

  const handlePrefClick = (pref: string) => {
    if (selectedRegion !== null) {
      setSelectedRegion(null);
      setSelectedPrefs([pref]);
    } else {
      setSelectedPrefs((prev) =>
        prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
      );
    }
  };

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedPrefs([]);
  };

  const activePrefs = selectedRegion
    ? (REGIONS.find((r) => r.name === selectedRegion)?.prefs ?? [])
    : selectedPrefs;

  const filtered =
    activePrefs.length === 0
      ? EVENTS
      : EVENTS.filter((e) => activePrefs.includes(e.pref));

  const selectionLabel = selectedRegion
    ? `${selectedRegion}（地方全体）`
    : selectedPrefs.length > 0
    ? selectedPrefs.join("・")
    : null;

  return (
    <>
      {/* エリア絞り込み */}
      <section style={{ padding: "32px 24px", maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>エリアから探す</h2>

        {selectionLabel ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#fff7ed", border: "1px solid #F97316", borderRadius: "8px",
            padding: "10px 16px", marginBottom: "12px",
          }}>
            <span style={{ fontSize: "14px", color: "#ea580c", fontWeight: "bold" }}>
              選択中：{selectionLabel}
            </span>
            <button
              onClick={handleReset}
              style={{ padding: "4px 14px", background: "#F97316", color: "#fff", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
            >
              リセット
            </button>
          </div>
        ) : (
          <div style={{ marginBottom: "12px", fontSize: "13px", color: "#9ca3af" }}>
            地方ブロックまたは都道府県を選んでください
          </div>
        )}

        <div style={{ border: "1px solid #fed7aa", borderRadius: "12px", padding: "16px 20px", background: "#fff7ed" }}>
          {REGIONS.map((region) => {
            const regionActive = selectedRegion === region.name;
            return (
              <div key={region.name} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => handleRegionClick(region)}
                  style={{
                    flexShrink: 0, minWidth: "72px", padding: "6px 14px", borderRadius: "8px",
                    fontWeight: "bold", fontSize: "14px", cursor: "pointer", border: "none",
                    background: regionActive ? "#c2410c" : "#F97316", color: "#fff",
                    boxShadow: regionActive ? "0 2px 8px rgba(249,115,22,0.5)" : "none",
                    transform: regionActive ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.15s",
                  }}
                >
                  {region.name}
                </button>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", flex: 1 }}>
                  {region.prefs.map((pref) => {
                    const prefActive = !selectedRegion && selectedPrefs.includes(pref);
                    return (
                      <button
                        key={pref}
                        onClick={() => handlePrefClick(pref)}
                        style={{
                          padding: prefActive ? "5px 14px" : "4px 12px", borderRadius: "20px",
                          fontSize: "13px", cursor: "pointer", border: "1.5px solid #F97316",
                          background: prefActive ? "#F97316" : "#fff",
                          color: prefActive ? "#fff" : "#ea580c",
                          fontWeight: prefActive ? "bold" : "normal",
                          boxShadow: prefActive ? "0 2px 6px rgba(249,115,22,0.4)" : "none",
                          transform: prefActive ? "scale(1.07)" : "scale(1)",
                          transition: "all 0.15s",
                        }}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* イベント一覧 */}
      <section style={{ padding: "0 24px 48px", maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
          {selectedRegion
            ? `${selectedRegion}の出店募集`
            : selectedPrefs.length > 0
            ? `${selectedPrefs.join("・")}の出店募集`
            : "新着の出店募集"}
          <span style={{ fontSize: "14px", fontWeight: "normal", color: "#6b7280", marginLeft: "8px" }}>
            {filtered.length}件
          </span>
        </h2>

        {filtered.length === 0 ? (
          <p style={{ color: "#6b7280", padding: "32px 0", textAlign: "center" }}>
            このエリアの募集情報は現在ありません。
          </p>
        ) : (
          filtered.map((e, i) => (
            <div
              key={i}
              style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginTop: i === 0 ? 0 : "16px" }}
            >
              <VendorIcons type={e.vendor_type} />
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{e.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>{e.location}</p>
              <p style={{ marginTop: "8px" }}>{e.dates}</p>
              <p>{e.detail}</p>
              <p style={{ color: "#dc2626", fontWeight: "bold" }}>{e.deadline}</p>
              <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={e.applyUrl} target="_blank" style={{ background: "#F97316", color: "#fff", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
                  応募する
                </a>
                <a href={e.siteUrl} target="_blank" style={{ border: "1px solid #F97316", color: "#F97316", padding: "10px 24px", borderRadius: "6px", textDecoration: "none" }}>
                  公式サイト
                </a>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
