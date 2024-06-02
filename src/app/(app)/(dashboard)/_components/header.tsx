'use client'

import { projects } from '../_data'
// import { useQueryClient } from '@tanstack/react-query'
// import { getQueryKey } from '@trpc/react-query'
import { BadgePercent, LoaderCircle, Magnet, Plug } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Breadcrumbs from '@/app/(app)/(dashboard)/_components/breadcrumbs'
import {
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  PanelLeftIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

// import { trpc } from '@/trpc/client'

const DashboardHeader = () => {
  // const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const getProjectKeys = getQueryKey(
  //   trpc.projects.getProjects,
  //   undefined,
  //   'query',
  // )

  const router = useRouter()

  // const previousProjects: any = queryClient.getQueryData(getProjectKeys)

  const dropdownProjectItems = projects?.map((project: any) => ({
    id: project?.id,
    name: project?.title,
  }))

  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 dark:bg-slate-950 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
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
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 text-lg font-semibold text-slate-50 dark:bg-slate-50 dark:text-slate-900 md:text-base'
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
        // ? only works for dynamic routes
        dropdownRoutes={[
          {
            route: 'project',
            dynamicRouteName: 'projectId',
            items: [...dropdownProjectItems],
          },
        ]}
      />
      <div className='relative ml-auto flex-1 md:grow-0'></div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='default' className='gap-1'>
            <Plug className='h-4 w-4' />
            Link Railway
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Link to Railway
            </DialogTitle>
            <DialogDescription className='mt-2 text-gray-600'>
              Connect your Railway account to manage your project. Enter your{' '}
              <span className='text-red-500'>API key</span> carefully, as it is
              a <span className='text-red-500'>sensitive</span> piece of
              information.
            </DialogDescription>
          </DialogHeader>
          <div className='my-4 grid w-full gap-2'>
            <Label htmlFor='api_key' className='font-medium text-gray-700'>
              API Key
            </Label>
            <Input
              type='text'
              id='api_key'
              placeholder='Enter your API Key'
              className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <p className='mt-1 text-sm'>
              Don&apos;t have an account on Railway?{' '}
              <a
                href='https://railway.app'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'>
                Create one here
              </a>
              .
            </p>
            <p className='mt-1 text-sm'>
              Need help creating your API key?{' '}
              <a
                href='https://railway.app/account/tokens'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'>
                Check this page
              </a>
              .
            </p>
          </div>
          <DialogFooter className='mt-4 flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='ghost' className='hover:bg-gray-100'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              className='gap-1 px-8'
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => {
                  setOpen(false)
                }, 3000)
              }}>
              {isLoading ? (
                <LoaderCircle className='h-4 w-4 animate-spin' />
              ) : (
                <Magnet className='h-4 w-4' />
              )}
              Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Plan  */}
      <Button
        variant='default'
        className='gap-1 capitalize'
        onClick={() => {
          router.push(
            'https://billing.stripe.com/p/login/test_7sI9EngYn0ZA6tO144',
          )
        }}>
        <BadgePercent className='h-4 w-4' />
        Manage subscription
      </Button>

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
          <DropdownMenuItem
            onClick={() => {
              signOut()
            }}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default DashboardHeader
