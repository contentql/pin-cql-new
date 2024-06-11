'use client'

import { Bell, Home, Package2, Users } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { trpc } from '@/trpc/client'

type Plan =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'Basic'
  | 'Creator'
  | 'Team'
  | null
  | undefined

const DashboardSideNav = () => {
  const { data: user } = trpc.user.getUser.useQuery()

  const plan = (user?.plan ? user?.plan : 'default') as Plan

  const getDisplayPlan = () => {
    if (plan === 'Basic') {
      return 'Upgrade to Creator'
    } else if (plan === 'Creator') {
      return 'Upgrade to Team'
    }

    return 'Plan Team'
  }

  const DisplayPlan = getDisplayPlan()
  return (
    <div className='fixed inset-y-0 left-0 hidden w-60 flex-col border-r bg-white dark:bg-slate-950 sm:flex'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Package2 className='h-6 w-6' />
            <span className=''>ContentQL</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              href='/dashboard'
              className='text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all'>
              <Home className='h-4 w-4' />
              Dashboard
            </Link>
            <Link
              href='/profile'
              className='text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all'>
              <Users className='h-4 w-4' />
              Profile
            </Link>
          </nav>
        </div>
        <div className='mt-auto p-4'>
          <Card x-chunk='dashboard-02-chunk-0'>
            <CardHeader className='p-2 pt-0 md:p-4'>
              <CardTitle>{DisplayPlan}</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
              <Link href='/pricing'>
                <Button variant={plan} size='sm' className='w-full'>
                  Upgrade
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardSideNav
