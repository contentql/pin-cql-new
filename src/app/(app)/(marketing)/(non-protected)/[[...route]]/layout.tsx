import Link from 'next/link'

// import { SiteFooter } from '@/components/site-footer'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils'

import { MainNav } from './_components/main-nav'

interface MarketingLayoutProps {
  children: React.ReactNode
}

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
      <main className='flex-1'>{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}
