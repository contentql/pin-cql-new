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

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

// import { HomeIcon, Package2Icon, PackageIcon, SettingsIcon } from '@/app/(app)/(dashboard)/_components/icons';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DashboardSideNav = () => {
  return (
    // <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white dark:bg-slate-950 sm:flex'>
    //   <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
    //     <TooltipProvider>
    //       <Link
    //         className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 text-lg font-semibold text-slate-50 dark:bg-slate-50 dark:text-slate-900 md:h-8 md:w-8 md:text-base'
    //         href='/'>
    //         <Package2Icon className='h-4 w-4 transition-all group-hover:scale-110' />
    //         <span className='sr-only'>Acme Inc</span>
    //       </Link>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50 md:h-8 md:w-8'
    //             href='#'>
    //             <HomeIcon className='h-5 w-5' />
    //             <span className='sr-only'>Dashboard</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side='right'>Dashboard</TooltipContent>
    //       </Tooltip>
    //       {/* <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             className='flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-900 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:bg-slate-800 dark:text-slate-50 dark:hover:text-slate-50'
    //             href='#'>
    //             <ShoppingCartIcon className='h-5 w-5' />
    //             <span className='sr-only'>Orders</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side='right'>Orders</TooltipContent>
    //       </Tooltip> */}
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50 md:h-8 md:w-8'
    //             href='#'>
    //             <PackageIcon className='h-5 w-5' />
    //             <span className='sr-only'>Products</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side='right'>Products</TooltipContent>
    //       </Tooltip>
    //       {/* <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
    //             href='#'>
    //             <UsersIcon className='h-5 w-5' />
    //             <span className='sr-only'>Customers</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side='right'>Customers</TooltipContent>
    //       </Tooltip>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:text-slate-400 dark:hover:text-slate-50'
    //             href='#'>
    //             <LineChartIcon className='h-5 w-5' />
    //             <span className='sr-only'>Analytics</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side='right'>Analytics</TooltipContent>
    //       </Tooltip> */}
    //     </TooltipProvider>
    //   </nav>
    //   <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
    //     <TooltipProvider>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50 md:h-8 md:w-8'
    //             href='#'>
    //             <SettingsIcon className='h-5 w-5' />
    //             <span className='sr-only'>Settings</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side='right'>Settings</TooltipContent>
    //       </Tooltip>
    //     </TooltipProvider>
    //   </nav>
    // </aside>
    <div className='fixed inset-y-0 left-0 hidden w-60 flex-col border-r bg-white dark:bg-slate-950 sm:flex'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Package2 className='h-6 w-6' />
            <span className=''>Acme Inc</span>
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
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
              <Link href='/pricing'>
                <Button size='sm' className='w-full'>
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
