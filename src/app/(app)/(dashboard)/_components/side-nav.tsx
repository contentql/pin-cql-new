import Link from 'next/link'

import {
  HomeIcon,
  Package2Icon,
  PackageIcon,
  SettingsIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const DashboardSideNav = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-slate-950'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <TooltipProvider>
          <Link
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 text-lg font-semibold text-slate-50 md:h-8 md:w-8 md:text-base dark:bg-slate-50 dark:text-slate-900'
            href='/'>
            <Package2Icon className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
                href='#'>
                <HomeIcon className='h-5 w-5' />
                <span className='sr-only'>Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Dashboard</TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-900 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:bg-slate-800 dark:text-slate-50 dark:hover:text-slate-50'
                href='#'>
                <ShoppingCartIcon className='h-5 w-5' />
                <span className='sr-only'>Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Orders</TooltipContent>
          </Tooltip> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
                href='#'>
                <PackageIcon className='h-5 w-5' />
                <span className='sr-only'>Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Products</TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
                href='#'>
                <UsersIcon className='h-5 w-5' />
                <span className='sr-only'>Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
                href='#'>
                <LineChartIcon className='h-5 w-5' />
                <span className='sr-only'>Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Analytics</TooltipContent>
          </Tooltip> */}
        </TooltipProvider>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
                href='#'>
                <SettingsIcon className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default DashboardSideNav
