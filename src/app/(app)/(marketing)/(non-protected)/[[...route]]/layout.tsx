import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

// import { SiteFooter } from '@/components/site-footer'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

  // const handleSignOut = async () => {
  //   'use server'
  //   await signOut()
  // }

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav />
          <nav>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='overflow-hidden rounded-full'
                    size='icon'
                    variant='outline'>
                    <Image
                      alt='Avatar'
                      className='overflow-hidden rounded-full'
                      height={36}
                      width={36}
                      src='/images/placeholder-user.jpg'
                      style={{
                        aspectRatio: '36/36',
                        objectFit: 'cover',
                      }}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href='/dashboard'>Dashboard</Link></DropdownMenuItem>
                   {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem>
                    <Link href='/profile'>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                   <DropdownMenuSeparator />
            
                    <form
                      action={async () => {
                        'use server'
                        await signOut()
                      }}>
                      <Button
                        type='submit'
                        variant='destructive'
                        size='sm'
                        className='w-full'>
                        Logout
                      </Button>
                    </form>
          
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
