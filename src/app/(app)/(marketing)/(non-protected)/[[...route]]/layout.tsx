import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import Link from 'next/link'

// import { SiteFooter } from '@/components/site-footer'
import { Button, buttonVariants } from '@/components/ui/button'
import { signOut } from '@/lib/auth'
import { getCurrentUser } from '@/lib/payload'
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

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav />
          <nav>
            {user ? (
              <form
                action={async () => {
                  'use server'
                  await signOut()
                }}>
                <Button type='submit' variant='destructive'>
                  Logout
                </Button>
              </form>
            ) : (
              // <Button
              //   onClick={() => signOut()}
              //   className={cn(
              //     buttonVariants({ variant: 'secondary', size: 'sm' }),
              //     'px-4',
              //   )}>
              //   Logout
              // </Button>
              <Link
                href='/sign-in'
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'px-4',
                )}>
                Login
              </Link>
            )}
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
