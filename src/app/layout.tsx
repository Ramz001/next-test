import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import RootProvider from '@/providers/root.provider'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Auth.js Demo',
  description:
    'Auth.js Demo – featuring MFA, forgot password, RBAC, and more advanced authentication features.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background relative min-h-screen w-full antialiased`}
      >
        <RootProvider>
          <span className="bg-grid-light bg-grid-dark fixed inset-0 z-[-1] transition-colors" />
          <Toaster position="bottom-center" />
          <SpeedInsights />
          <Analytics />
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
