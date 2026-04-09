import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  metadataBase: new URL('https://canopyshield.com/cannabis'),
  title: {
    template: '%s | CanopyShield',
    default: 'Cannabis Insurance | CanopyShield',
  },
  description: 'CanopyShield provides specialized cannabis insurance for dispensaries, cultivators, processors, and every operation in the legal cannabis supply chain.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CanopyShield',
    images: [
      {
        url: 'https://images.pexels.com/photos/7667908/pexels-photo-7667908.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'CanopyShield — Cannabis Insurance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cannabis Insurance | CanopyShield',
    description: 'Specialized cannabis insurance for dispensaries, cultivators, processors, and the legal cannabis supply chain.',
    images: ['https://images.pexels.com/photos/7667908/pexels-photo-7667908.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://canopyshield.com/cannabis/',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
