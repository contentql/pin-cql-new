import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'

import DashboardHeader from '@/app/(app)/(dashboard)/_components/header'
import DashboardSideNav from '@/app/(app)/(dashboard)/_components/side-nav'
import { getCurrentUser } from '@/lib/payload'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getCurrentUser()
  if (!user) return redirect('/sign-in')
  return (
    <div className='flex min-h-screen w-full flex-col bg-slate-100/40 dark:bg-slate-800/40'>
      <DashboardSideNav />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <DashboardHeader />
        {children}
        <Toaster />
      </div>
    </div>
  )
}

export default DashboardLayout
