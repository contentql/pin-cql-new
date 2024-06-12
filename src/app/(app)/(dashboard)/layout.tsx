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
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]'>
      <div className='bg-muted/40 hidden md:block '>
        <DashboardSideNav />
      </div>
      <div className='flex flex-col sm:gap-4 sm:py-4'>
        <DashboardHeader user={user} />
        {children}
        <Toaster />
      </div>
    </div>
  )
}

export default DashboardLayout
