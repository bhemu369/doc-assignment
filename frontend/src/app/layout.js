import './globals.css'

export const metadata = {
  title: 'Apollo 247 - Doctor Consultation & Medicines Online',
  description: 'Get online consultation with expert doctors, order medicines online & book lab tests from the comfort of your home. Apollo 247 - Your trusted healthcare app.',
  keywords: 'doctor consultation, online doctor, apollo, medicine online, apollo 247, health, healthcare',
  alternates: {
    canonical: 'https://www.apollo247.com/',
  },
  openGraph: {
    title: 'Apollo 247 - Doctor Consultation & Medicines Online',
    description: 'Get online consultation with expert doctors, order medicines online & book lab tests from the comfort of your home. Apollo 247 - Your trusted healthcare app.',
    url: 'https://www.apollo247.com',
    siteName: 'Apollo 247',
    images: [
      {
        url: 'https://www.apollo247.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apollo 247 - Doctor Consultation & Medicines Online',
    description: 'Get online consultation with expert doctors, order medicines online & book lab tests from the comfort of your home. Apollo 247 - Your trusted healthcare app.',
    images: ['https://www.apollo247.com/og-image.jpg'],
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
