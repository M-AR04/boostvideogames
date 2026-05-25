import type { Metadata } from 'next';
import { Outfit, Cairo } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Preloader from '@/components/Preloader';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Boost Video Game | premium Retail & Maintenance - Swefieh, Amman',
  description: 'Boost Video Game is Amman\'s leading gaming retailer and maintenance center. Over 25 years of experience in repairing drift, upgrading hardware, and retailing high-end gaming consoles, keyboards, mice, and accessories. Experience a higher level of gaming.',
  keywords: 'Boost Video Game, Gaming Amman, Swefieh, Jordan Gaming, Console Repair Jordan, drift fix, PS5 Amman, Switch OLED, AttackShark, Logitech Superlight, gaming store Amman',
  metadataBase: new URL('https://boostvideogame.com'),
  openGraph: {
    title: 'Boost Video Game | Retail & Maintenance Center - Amman',
    description: 'Expert console repairs, gaming PC accessories, custom game controllers and premium gaming hardware in Jordan.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_JO',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${outfit.variable} ${cairo.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#090514] text-gray-100 selection:bg-brand-red selection:text-white" suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {/* Professional cinematic preloading animation */}
              <Preloader />
              
              {/* Main Application Container */}
              <div className="flex flex-col flex-1 min-h-screen">
                {children}
              </div>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
