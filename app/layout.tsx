import './globals.css';
import type { Metadata } from 'next';
import { Lato, Raleway } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Audiolytix',
  description: 'Check your most played tracks and artists!',
};

const lato = Lato({
  weight: ['400', '700'],
  variable: '--font-lato',
  subsets: ['latin'],
});

const raleway = Raleway({
  weight: ['700', '800'],
  variable: '--font-raleway',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // bg-gradient-to-br from-sky-900 via-zinc-900 to-rose-900
  return (
    <html
      lang='en'
      className={`h-fit bg-[#1E1E1E] bg-[url('/bg-spots.webp')] bg-cover text-white ${lato.variable} ${raleway.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
