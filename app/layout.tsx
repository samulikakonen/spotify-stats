import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '../components/provider';

export const metadata: Metadata = {
  title: 'Spotify stats',
  description: 'Simple spotify statistics page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
