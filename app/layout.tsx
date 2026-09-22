import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ddl.arjunlabscom.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: 'e-HusbREtfuUzN8uaHqQYikXMX4IGU2fqwddq-BCSzk',
  },
  title: 'DDL | CAD Design, Machining, 3D Printing & Reverse Engineering',
  description: 'DDL provides CAD design, engineering drawings, machining, rapid prototyping, 3D printing and reverse engineering solutions for engineering and manufacturing needs.',
  keywords: [
    'CAD design',
    '3D CAD modelling',
    'engineering drawings',
    'manufacturing drawings',
    'machining',
    'CNC machining',
    'rapid prototyping',
    '3D printing',
    'FDM',
    'SLA',
    'SLS',
    'reverse engineering',
    'physical to CAD',
    'design optimization',
  ],
  generator: 'v0.app',
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
    canonical: '/',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'DDL | CAD Design, Machining, 3D Printing & Reverse Engineering',
    description: 'Engineering design, CAD, machining, rapid prototyping, 3D printing and reverse engineering solutions by DDL.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DDL Engineering - CAD Design and Manufacturing',
      },
    ],
    siteName: 'DDL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DDL | CAD Design, Machining, 3D Printing & Reverse Engineering',
    description: 'Engineering design, CAD, machining, rapid prototyping, 3D printing and reverse engineering solutions by DDL.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DDL',
              url: siteUrl,
              email: 'mailto:dilipnaga9380@gmail.com',
              telephone: '+919380586479',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+919380586479',
                email: 'dilipnaga9380@gmail.com',
                contactType: 'customer service',
              },
            }),
          }}
        />
        {process.env.GOOGLE_SITE_VERIFICATION && <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />}
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
