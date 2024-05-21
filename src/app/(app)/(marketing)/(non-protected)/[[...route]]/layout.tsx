import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import Link from 'next/link'

// import { SiteFooter } from '@/components/site-footer'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils'

import { MainNav } from './_components/main-nav'

interface MarketingLayoutProps {
  children: React.ReactNode
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontHeading = localFont({
  src: './assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

export const marketingConfig = {
  mainNav: [
    {
      title: 'Features',
      href: '/#features',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Documentation',
      href: '',
    },
  ],
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href='/sign-in'
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'px-4',
              )}>
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}>
        {children}
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}
