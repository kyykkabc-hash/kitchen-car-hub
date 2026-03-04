import React from 'react';

export const metadata = {
  title: 'KITCHEN CAR HUB',
  description: 'キッチンカー出店募集情報検索サイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
