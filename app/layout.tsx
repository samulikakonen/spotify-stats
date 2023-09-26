import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '../components/provider';

export const metadata: Metadata = {
  title: 'Audiolytix',
  description: 'Check your most played tracks and artists!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='bg-zinc-900 text-white'>
      <body className='container sm mx-auto px-48'>{children}</body>
    </html>
  );
}
