import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FloatingFeedbackWidget from '@/components/FloatingFeedbackWidget';
import GlobalAuthManager from '@/components/GlobalAuthManager';
import LocationPrompt from '@/components/LocationPrompt';
import StructuredData from '@/components/StructuredData';
import { ToastProvider } from '@/context/ToastContext';
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from '@/lib/site';
import { localBusinessJsonLd } from '@/lib/seo';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | Same-Day Appliance Repair in Hyderabad`, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  keywords: [
    'home appliance repair Hyderabad',
    'doorstep appliance service Hyderabad',
    'AC repair Hyderabad',
    'refrigerator repair Hyderabad',
    'washing machine repair Hyderabad',
    'microwave oven repair Hyderabad',
    'geyser repair Hyderabad',
    'TV repair Hyderabad',
    'same day appliance repair Hyderabad',
    'appliance service center Hyderabad',
    'doorstep technician Hyderabad',
    'Hyderabad appliance service',
  ],
  category: 'home services',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Same-Day Appliance Repair in Hyderabad`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_IN',
  },
  twitter: { card: 'summary', title: SITE_NAME, description: DEFAULT_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#1E40AF' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${plusJakartaSans.className} font-sans`} suppressHydrationWarning>
        <ToastProvider>
          <StructuredData data={localBusinessJsonLd()} />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <GlobalAuthManager />
        </ToastProvider>
      </body>
    </html>
  );
}
