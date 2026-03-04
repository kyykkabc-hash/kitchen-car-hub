// app/page.tsx
import Link from "next/link";

type TruckSize = "軽" | "1.5t" | "2t" | "3t";

type EventItem = {
  id: string;
  title: string;
  prefecture: string; // 例: "東京"
  area: string; // 例: "台東区"
  dateStart: string; // ISO: "2026-03-14"
  dateEnd?: string; // 1日なら省略可
  weekday: "月" | "火" | "水" | "木" | "金" | "土" | "日";
  time?: string; // "10:00-16:00"
  venue: string;
  address?: string;

  // 追加したい「今すぐ知りたい」情報
  power: boolean; // 電源の有無
  visitorsEstimate?: number; // 過去の来場者数目安
  truckSizeMax: TruckSize; // 車両サイズ制限

  // 申込/詳細
  applyUrl: string;

  // Amazonアフィ枠（ここはダミーのURL。自分のアソシエイトURLに置換して運用）
  amazonPicks: Array<{
    label: string; // 例: "容器"
    note?: string; // 例: "汁物OKのフタ付き推奨"
    url: string;
  }>;
};

/**
 * ✅ サンプルデータ（まずはここを編集して運用）
 * - prefecture は都道府県ボタンの値と一致させる（例: "東京"）
 * - dateStart は ISO 形式がおすすめ
 */
const EVENTS: EventItem[] = [
  {
    id: "tokyo-asakusa-20260309",
    title: "浅草・週末フードマーケット（出店募集）",
    prefecture: "東京",
    area: "台東区",
    dateStart: "2026-03-07",
    weekday: "土",
    time: "11:00-17:00",
    venue: "浅草〇〇広場",
    address: "東京都台東区〇〇",
    power: true,
    visitorsEstimate: 3500,
    truckSizeMax: "1.5t",
    applyUrl: "https://example.com/asakusa-market",
    amazonPicks: [
      {
        label: "容器",
        note: "汁漏れしにくいフタ付き",
        url: "https://www.amazon.co.jp/dp/XXXXXXXX?tag=YOURTAG-22",
      },
      {
        label: "燃料",
        note: "予備ボンベ/CB缶など",
        url: "https://www.amazon.co.jp/dp/YYYYYYYY?tag=YOURTAG-22",
      },
    ],
  },
  {
    id: "tokyo-nerima-20260312",
    title: "練馬・公園マルシェ（キッチンカー枠）",
    prefecture: "東京",
    area: "練馬区",
    dateStart: "2026-03-12",
    weekday: "木",
    time: "10:00-16:00",
    venue: "練馬△△公園",
    power: false,
    visitorsEstimate: 1200,
    truckSizeMax: "軽",
    applyUrl: "https://example.com/nerima-park",
    amazonPicks: [
      {
        label: "発電/電源対策",
        note: "電源なし想定の必需品",
        url: "https://www.amazon.co.jp/dp/ZZZZZZZZ?tag=YOURTAG-22",
      },
      {
        label: "消耗品",
        note: "手袋/拭き取り/ゴミ袋",
        url: "https://www.amazon.co.jp/dp/AAAAAAAA?tag=YOURTAG-22",
      },
    ],
  },
  {
    id: "saitama-soka-20260315",
    title: "草加・週末まつり（出店者募集）",
    prefecture: "埼玉",
    area: "草加市",
    dateStart: "2026-03-15",
    weekday: "日",
    time: "10:00-16:00",
    venue: "松原団地記念公園（周辺）",
    power: true,
    visitorsEstimate: 2000,
    truckSizeMax: "3t",
    applyUrl: "https://example.com/soka-fes",
    amazonPicks: [
      {
        label: "容器",
        note: "屋外向けの頑丈タイプ",
        url: "https://www.amazon.co.jp/dp/BBBBBBBB?tag=YOURTAG-22",
      },
      {
        label: "燃料",
        note: "混雑に備え予備を",
        url: "https://www.amazon.co.jp/dp/CCCCCCCC?tag=YOURTAG-22",
      },
    ],
  },
  {
    id: "kanagawa-yokohama-20260320",
    title: "横浜・臨海エリア夜市（キッチンカー募集）",
    prefecture: "神奈川",
    area: "横浜市",
    dateStart: "2026-03-20",
    weekday: "金",
    time: "16:00-21:00",
    venue: "横浜ベイ△△",
    power: true,
    visitorsEstimate: 5000,
    truckSizeMax: "2t",
    applyUrl: "https://example.com/yokohama-night",
    amazonPicks: [
      {
        label: "照明",
        note: "夜営業の見栄えUP",
        url: "https://www.amazon.co.jp/dp/DDDDDDDD?tag=YOURTAG-22",
      },
      {
        label: "容器",
        note: "持ち帰りに強い",
        url: "https://www.amazon.co.jp/dp/EEEEEEEE?tag=YOURTAG-22",
      },
    ],
  },
  {
    id: "chiba-kashiwa-20260322",
    title: "柏・ショッピングモール前（平日スポット）",
    prefecture: "千葉",
    area: "柏市",
    dateStart: "2026-03-22",
    weekday: "日",
    time: "11:00-19:00",
    venue: "柏□□モール前",
    power: false,
    visitorsEstimate: 1800,
    truckSizeMax: "1.5t",
    applyUrl: "https://example.com/kashiwa-mall",
    amazonPicks: [
      {
        label: "電源対策",
        note: "電源なし想定",
        url: "https://www.amazon.co.jp/dp/FFFFFFFF?tag=YOURTAG-22",
      },
      {
        label: "燃料",
        note: "長時間営業用",
        url: "https://www.amazon.co.jp/dp/GGGGGGGG?tag=YOURTAG-22",
      },
    ],
  },
];

const PREFECTURES = ["東京", "埼玉", "神奈川", "千葉"] as const;

function formatDateRange(start: string, end?: string) {
  // 表示用（ISO前提）
  const s = start.replaceAll("-", "/");
  if (!end || end === start) return s;
  return `${s}〜${end.replaceAll("-", "/")}`;
}

function PowerBadge({ on }: { on: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        on
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-zinc-50 text-zinc-700 ring-1 ring-zinc-200",
      ].join(" ")}
      title={on ? "電源あり" : "電源なし"}
      aria-label={on ? "電源あり" : "電源なし"}
    >
      <span aria-hidden="true">{on ? "🔌" : "🪫"}</span>
      {on ? "電源あり" : "電源なし"}
    </span>
  );
}

function TruckBadge({ size }: { size: TruckSize }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
      <span aria-hidden="true">🚚</span> 最大{size}
    </span>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams?:<Record<string, string | string[] | undefined>>;
}) {
  const sp = (searchParams) ?? {};

  // クエリ取得：?prefecture=東京
  const prefecture =
    typeof sp.prefecture === "string" ? sp.prefecture : undefined;

  // 追加：曜日フィルタ（UIは将来拡張用）
  const weekday = typeof sp.weekday === "string" ? sp.weekday : undefined;

  // 追加：電源フィルタ（UIは将来拡張用）
  const power =
    typeof sp.power === "string"
      ? sp.power === "1" || sp.power === "true"
      : undefined;

  // ✅ フィルタリング（クエリに合わせて抽出）
  const filtered = EVENTS.filter((e) => {
    if (prefecture && e.prefecture !== prefecture) return false;
    if (weekday && e.weekday !== weekday) return false;
    if (power !== undefined && e.power !== power) return false;
    return true;
  });

  const activeLabel = prefecture ? `「${prefecture}」` : "全国（サンプル）";

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            キッチンカー出店募集サーチ
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            明日・来週の「空き」を最速で見つける。備品もその場で揃える。
          </p>

          {/* Prefecture Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className={[
                "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                !prefecture
                  ? "bg-zinc-900 text-white ring-zinc-900"
                  : "bg-white text-zinc-800 ring-zinc-200 hover:bg-zinc-100",
              ].join(" ")}
            >
              すべて
            </Link>

            {PREFECTURES.map((p) => (
              <Link
                key={p}
                href={`/?prefecture=${encodeURIComponent(p)}`}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                  prefecture === p
                    ? "bg-zinc-900 text-white ring-zinc-900"
                    : "bg-white text-zinc-800 ring-zinc-200 hover:bg-zinc-100",
                ].join(" ")}
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Quick hints */}
          <div className="mt-4 text-xs text-zinc-600">
            ヒント：URLの末尾に{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5">?prefecture=東京</code>{" "}
            のように付けると都道府県で絞れます。
          </div>
        </div>
      </header>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              検索結果：{activeLabel}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              {filtered.length} 件
            </p>
          </div>

          {/* (Optional) Small filter chips – 1ファイルで拡張しやすいように置いておく */}
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href={
                prefecture
                  ? `/?prefecture=${encodeURIComponent(prefecture)}&power=1`
                  : "/?power=1"
              }
              className={[
                "rounded-full px-3 py-1 ring-1 transition",
                power === true
                  ? "bg-emerald-600 text-white ring-emerald-600"
                  : "bg-white text-zinc-700 ring-zinc-200 hover:bg-zinc-100",
              ].join(" ")}
              title="電源ありのみ表示"
            >
              🔌 電源あり
            </Link>

            <Link
              href={prefecture ? `/?prefecture=${encodeURIComponent(prefecture)}` : "/"}
              className={[
                "rounded-full px-3 py-1 ring-1 transition",
                power === undefined
                  ? "bg-zinc-900 text-white ring-zinc-900"
                  : "bg-white text-zinc-700 ring-zinc-200 hover:bg-zinc-100",
              ].join(" ")}
              title="フィルタ解除"
            >
              フィルタ解除
            </Link>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border bg-white p-6 text-zinc-700">
            該当する募集がありません。別の都道府県を選ぶか、データを追加してください。
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((e) => (
              <article
                key={e.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      {e.prefecture}・{e.area} / {e.venue}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <PowerBadge on={e.power} />
                    <TruckBadge size={e.truckSizeMax} />
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-zinc-50 p-3">
                    <div className="text-xs text-zinc-500">開催日</div>
                    <div className="mt-1 font-medium text-zinc-900">
                      {formatDateRange(e.dateStart, e.dateEnd)}（{e.weekday}）
                    </div>
                    {e.time ? (
                      <div className="mt-1 text-xs text-zinc-600">{e.time}</div>
                    ) : null}
                  </div>

                  <div className="rounded-lg bg-zinc-50 p-3">
                    <div className="text-xs text-zinc-500">来場者目安</div>
                    <div className="mt-1 font-medium text-zinc-900">
                      {typeof e.visitorsEstimate === "number"
                        ? `${e.visitorsEstimate.toLocaleString()} 人`
                        : "情報なし"}
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">
                      ※過去実績/主催発表など
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <a
                    href={e.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                  >
                    公式サイトで詳細を確認して申し込む
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                  <p className="mt-2 text-xs text-zinc-500">
                    ※募集条件・出店料・設備・提出書類は必ず公式で確認してください。
                  </p>
                </div>

                {/* Amazon Affiliate Picks */}
                <div className="mt-5 rounded-xl border bg-zinc-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900">
                      このイベントに必須の消耗品
                    </div>
                    <div className="text-xs text-zinc-500">
                      Amazonアソシエイト
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2">
                    {e.amazonPicks.map((p, idx) => (
                      <a
                        key={idx}
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-3 rounded-lg bg-white p-3 text-sm ring-1 ring-zinc-200 transition hover:bg-zinc-100"
                      >
                        <div>
                          <div className="font-medium text-zinc-900">
                            {p.label}
                          </div>
                          {p.note ? (
                            <div className="mt-0.5 text-xs text-zinc-600">
                              {p.note}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-xs font-semibold text-zinc-700">
                          見る →
                        </div>
                      </a>
                    ))}
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                    ※当サイトはAmazonアソシエイトとして適格販売により収入を得ています。
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Alert UI (Footer before) */}
        <div className="mt-10 rounded-2xl border bg-white p-6">
          <h3 className="text-base font-semibold text-zinc-900">
            この条件の新着を受け取る（LINE / メール）
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            まずはUIだけ実装（送信先への通知は次スプリントで実装）。
          </p>

          <form
            className="mt-4 grid gap-3 md:grid-cols-3"
            onSubmit={(e) => {
              e.preventDefault();
              // 外部DBなし運用のため、現状はデモ挙動
              alert(
                "受け取り登録（デモ）を送信しました。\n次のステップでフォーム送信先（Formspree等）またはAPIを実装します。"
              );
            }}
          >
            <div className="md:col-span-1">
              <label className="text-xs font-medium text-zinc-700">
                地域（都道府県）
              </label>
              <input
                name="prefecture"
                defaultValue={prefecture ?? ""}
                placeholder="例：東京"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ring-orange-200 focus:ring-2"
              />
            </div>

            <div className="md:col-span-1">
              <label className="text-xs font-medium text-zinc-700">
                曜日（任意）
              </label>
              <input
                name="weekday"
                defaultValue={weekday ?? ""}
                placeholder="例：土"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ring-orange-200 focus:ring-2"
              />
            </div>

            <div className="md:col-span-1">
              <label className="text-xs font-medium text-zinc-700">
                連絡先（メール or LINE ID）
              </label>
              <input
                name="contact"
                placeholder="例：example@gmail.com / LINE:xxxx"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ring-orange-200 focus:ring-2"
              />
            </div>

            <div className="md:col-span-3 flex flex-wrap items-center gap-3 pt-2">
              <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
                <input type="checkbox" name="powerOnly" className="h-4 w-4" />
                電源ありのみ
              </label>

              <button
                type="submit"
                className="ml-auto inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                新着を受け取る
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs text-zinc-500">
            ※個人情報の取り扱い・プライバシーポリシーは公開前に必ず整備してください。
          </p>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-600">
          <div className="font-semibold text-zinc-900">
            キッチンカー出店募集サーチ
          </div>
          <p className="mt-2">
            「明日・来週の空き」を最速で見つけるための検索サイト（プロトタイプ）。
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            免責：掲載情報の正確性・最新性は保証できません。必ず公式サイトでご確認ください。
          </p>
        </div>
      </footer>
    </main>
  );
}
