import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/(app)/globals.css'
// import '@/app/(app)/theme.scss'
import Provider from '@/trpc/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ContentQL Dashboard',
  description: 'ContentQL Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <script async src='https://js.stripe.com/v3/pricing-table.js'></script>
      </head>
      <body className={`${inter.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
