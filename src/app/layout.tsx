import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AFL Game Prediction System',
  description: 'Make data-driven predictions for AFL games',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
