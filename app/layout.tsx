import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mikko Kohtala - Software Developer',
  description:
    'Experienced software developer with a strong background in both consultancy and in-house roles, building solutions from concept to production.',
  keywords: ['software developer', 'Tampere', 'Finland', 'AI', 'emerging technologies', 'full stack'],
  authors: [{ name: 'Mikko Kohtala' }],
  creator: 'Mikko Kohtala',
  openGraph: {
    title: 'Mikko Kohtala - Software Developer',
    description:
      'Experienced software developer with a strong background in both consultancy and in-house roles, building solutions from concept to production.',
    url: 'https://www.mikkokohtala.com',
    siteName: 'Mikko Kohtala',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mikko Kohtala - Software Developer',
    description:
      'Experienced software developer with a strong background in both consultancy and in-house roles, building solutions from concept to production.',
    creator: '@mikkokohtala',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableSystem={true}>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
