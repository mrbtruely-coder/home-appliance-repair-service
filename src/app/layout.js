import './globals.css';
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
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body suppressHydrationWarning>
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
