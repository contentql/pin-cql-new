import Image from 'next/image'
import Link from 'next/link'

import Breadcrumbs from '@/app/(app)/(dashboard)/_components/breadcrumbs'
import {
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  PanelLeftIcon,
  SearchIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const DashboardHeader = () => {
  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 dark:bg-slate-950'>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='sm:hidden' size='icon' variant='outline'>
            <PanelLeftIcon className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className='sm:max-w-xs' side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 text-lg font-semibold text-slate-50 md:text-base dark:bg-slate-50 dark:text-slate-900'
              href='#'>
              <Package2Icon className='h-5 w-5 transition-all group-hover:scale-110' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link
              className='flex items-center gap-4 px-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50'
              href='#'>
              <HomeIcon className='h-5 w-5' />
              Dashboard
            </Link>
            <Link
              className='flex items-center gap-4 px-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50'
              href='#'>
              <ShoppingCartIcon className='h-5 w-5' />
              Orders
            </Link>
            <Link
              className='flex items-center gap-4 px-2.5 text-slate-950 dark:text-slate-50'
              href='#'>
              <PackageIcon className='h-5 w-5' />
              Products
            </Link>
            <Link
              className='flex items-center gap-4 px-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50'
              href='#'>
              <UsersIcon className='h-5 w-5' />
              Customers
            </Link>
            <Link
              className='flex items-center gap-4 px-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-50'
              href='#'>
              <LineChartIcon className='h-5 w-5' />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumbs
        maxLength={5}
        dropdownRoutes={[
          {
            route: 'project',
            items: [
              {
                id: 'hcnuwehfk83484sdf',
                name: 'project 1',
              },
              { id: 'mcsuc3q74h3ica349s', name: 'project 2' },
              { id: 'csdcuaweh3u894uhwcsd', name: 'project 3' },
            ],
          },
        ]}
      />
      <div className='relative ml-auto flex-1 md:grow-0'>
        <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400' />
        <Input
          className='w-full rounded-lg bg-white pl-8 md:w-[200px] lg:w-[336px] dark:bg-slate-950'
          placeholder='Search...'
          type='search'
        />
      </div>
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
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default DashboardHeader
