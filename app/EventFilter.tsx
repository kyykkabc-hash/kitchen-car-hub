"use client";

import { useState } from "react";

const EVENTS = [
  {
    pref: "埼玉県",
    title: "埼玉県農林公園フリーマーケット",
    location: "埼玉県深谷市",
    dates: "📅 3月15日・4月5日・4月19日・5月3日・5月17日",
    detail: "🕐 9:00〜14:00　💰 1区画2,000円",
    deadline: "⏰ 募集締切：当日受付",
    applyUrl: "https://fleamarket.or.jp/form/email.html",
    siteUrl: "https://fleamarket.or.jp/nourin.html",
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
  },
];

const PREFS = ["東京都", "神奈川県", "埼玉県", "千葉県", "群馬県", "栃木県", "山梨県"];

export default function EventFilter() {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected ? EVENTS.filter((e) => e.pref === selected) : EVENTS;

  return (
    <>
      {/* エリアフィルターボタン */}
      <section style={{ padding: "32px 24px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>エリアから探す</h2>
        <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelected(null)}
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              border: "2px solid #F97316",
              background: selected === null ? "#F97316" : "#fff",
              color: selected === null ? "#fff" : "#F97316",
            }}
          >
            すべて
          </button>
          {PREFS.map((p) => (
            <button
              key={p}
              onClick={() => setSelected(p)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                border: "2px solid #F97316",
                background: selected === p ? "#F97316" : "#fff",
                color: selected === p ? "#fff" : "#F97316",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* イベント一覧 */}
      <section style={{ padding: "0 24px 48px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
          {selected ? `${selected}の出店募集` : "新着の出店募集"}
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
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                marginTop: i === 0 ? 0 : "16px",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{e.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>{e.location}</p>
              <p style={{ marginTop: "8px" }}>{e.dates}</p>
              <p>{e.detail}</p>
              <p style={{ color: "#dc2626", fontWeight: "bold" }}>{e.deadline}</p>
              <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={e.applyUrl}
                  target="_blank"
                  style={{ background: "#F97316", color: "#fff", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}
                >
                  応募する
                </a>
                <a
                  href={e.siteUrl}
                  target="_blank"
                  style={{ border: "1px solid #F97316", color: "#F97316", padding: "10px 24px", borderRadius: "6px", textDecoration: "none" }}
                >
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
