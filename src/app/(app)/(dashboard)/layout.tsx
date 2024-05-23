import DashboardHeader from '@/app/(app)/(dashboard)/_components/header'
import DashboardSideNav from '@/app/(app)/(dashboard)/_components/side-nav'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='flex min-h-screen w-full flex-col bg-slate-100/40 dark:bg-slate-800/40'>
      <DashboardSideNav />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
