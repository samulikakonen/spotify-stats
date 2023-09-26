import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audiolytix',
  description: 'Check your most played tracks and artists!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='bg-zinc-900 text-white'>
      <body>{children}</body>
    </html>
  );
}
