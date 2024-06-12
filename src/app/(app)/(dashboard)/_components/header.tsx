'use client'

import { projects } from '../_data'
// import { useQueryClient } from '@tanstack/react-query'
// import { getQueryKey } from '@trpc/react-query'
import { BadgePercent } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from 'payload-types'
import { useState } from 'react'
import { toast } from 'sonner'

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
// import { updateRailwayApi } from '@/components/ProfileForm/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { trpc } from '@/trpc/client'

import { NovuNotificationCenterProvider } from '~/src/providers/NovuProvider'

type Plan =
  | 'link'
  | 'default'
  | 'Basic'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'Creator'
  | 'Team'
  | null
  | undefined

interface Props {
  user: User
}

const DashboardHeader: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [railwayApiKey, setRailwayApiKey] = useState<string>('')

  // const { data: user } = trpc.user.getUser.useQuery()

  const router = useRouter()

  const { mutate: createCustomerPortalSession } =
    trpc.stripe.createCustomerPortalSession.useMutation({
      onSuccess: async data => {
        router.push(data?.url)
      },
    })

  const plan = (user?.plan ? user?.plan : 'default') as Plan

  const { mutate: updateRailwayApi, isPending: isLoading } =
    trpc.user.updateRailwayApi.useMutation({
      onSuccess: async () => {
        setOpen(false)
        toast.success('Railway API updated successfully')
      },
      onError: async () => {
        toast.error('Updating railway Api Error')
      },
    })

  // const previousProjects: any = queryClient.getQueryData(getProjectKeys)

  const dropdownProjectItems = projects?.map((project: any) => ({
    id: project?.id,
    name: project?.title,
  }))

  const handleSubmit = () => {
    try {
      // updateRailwayApi(c)
      updateRailwayApi({ railwayApiKey })
      // railwayFrom(railwayApiKey)
    } catch (error) {
      console.log(error)
    }
  }

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

      {/* Manage Plan  */}
      {plan === 'Basic' ? (
        <Link href='/pricing'>
          <Button variant={plan} size='sm' className='w-full gap-1 capitalize'>
            Pricing
          </Button>
        </Link>
      ) : (
        <Button
          variant={plan}
          className='gap-1 capitalize'
          onClick={() => {
            createCustomerPortalSession()
          }}>
          <BadgePercent className='h-4 w-4' />
          Manage subscription
        </Button>
      )}

      {/* Novu Notification Center */}
      <NovuNotificationCenterProvider user={user} />

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
