import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audiolytix',
  description: 'Check your most played tracks and artists!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-fit bg-gradient-to-br from-sky-900 via-zinc-900 to-rose-900 text-white'>
      <body>{children}</body>
    </html>
  );
}
