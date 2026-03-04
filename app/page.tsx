import React from 'react';

export default function HomePage() {
  const prefectures = ['東京', '神奈川', '埼玉', '千葉', '大阪', '福岡'];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* ヘッダー */}
      <header className="bg-orange-500 text-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-black italic tracking-wider">KITCHEN CAR HUB</h1>
        <p className="text-sm font-bold mt-1 opacity-90">出店募集を、最速で見つける。</p>
      </header>

      {/* 検索セクション */}
      <main className="p-6 max-w-md mx-auto">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="bg-orange-500 w-1.5 h-6 block rounded-full"></span>
            地域から探す
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {prefectures.map((pref) => (
              <button 
                key={pref}
                className="border-2 border-gray-100 rounded-2xl p-4 flex justify-between items-center bg-gray-50 active:scale-95 active:bg-orange-50 transition-all text-left"
              >
                <span className="font-bold">{pref}</span>
                <span className="text-orange-500 text-xs font-bold">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* 注目募集（ダミー） */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold mb-4">注目の新着募集</h2>
          <div className="border-2 border-orange-100 rounded-2xl p-4 bg-orange-50 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">歩合制 (固定0円)</span>
              <span className="text-red-500 text-[10px] font-bold">あと3日</span>
            </div>
            <h3 className="font-bold text-lg leading-tight mb-1">代々木公園わんわんマルシェ</h3>
            <p className="text-xs text-gray-500">2026/05/10(日) | 東京都渋谷区</p>
          </div>
        </section>
      </main>

      {/* アフィリエイト枠（準備中） */}
      <footer className="mt-12 p-8 bg-gray-900 text-white text-center">
        <p className="text-xs opacity-50 mb-4">© 2026 Kitchen Car Hub</p>
        <div className="border border-gray-700 rounded-lg p-4 text-sm text-gray-400">
          <p className="mb-2">出店の必需品をチェック</p>
          <div className="flex justify-center gap-4">
            <span className="underline">ポータブル電源</span>
            <span className="underline">看板・備品</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
