'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  CirclePlusIcon,
  FileIcon,
  HomeIcon,
  LineChartIcon,
  ListFilterIcon,
  Package2Icon,
  PackageIcon,
  PanelLeftIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const DashboardView = () => {
  const projects = [
    {
      id: 'aidjnx8j3e89oddd2ne8',
      title: 'Project 1',
      services: [{ id: '' }, { id: '' }],
      description: 'This is project 1',
      icon: (
        <span className='relative flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
        </span>
      ),
    },
    {
      id: 'xndwejn84ow9udcdiojw',
      title: 'Project 2',
      services: [{ id: '' }, { id: '' }],
      description: 'This is project 2',
      icon: (
        <span className='relative flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
        </span>
      ),
    },
    {
      id: 'fxtf7u8u9kokokoi97t7gfh',
      title: 'Project 3',
      services: [{ id: '' }, { id: '' }],
      description: 'This is project 3',
      icon: (
        <span className='relative flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
        </span>
      ),
    },
    {
      id: 'ygfygyvghgtftgf6655768jii',
      title: 'Project 4',
      services: [{ id: '' }, { id: '' }],
      description: 'This is project 4',
      icon: (
        <span className='relative flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-yellow-500'></span>
        </span>
      ),
    },
  ]

  const router = useRouter()

  return (
    <div className='flex min-h-screen w-full flex-col bg-slate-100/40 dark:bg-slate-800/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-slate-950'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
          <TooltipProvider>
            <Link
              className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 text-lg font-semibold text-slate-50 md:h-8 md:w-8 md:text-base dark:bg-slate-50 dark:text-slate-900'
              href='#'>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className='flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-900 transition-colors hover:text-slate-950 md:h-8 md:w-8 dark:bg-slate-800 dark:text-slate-50 dark:hover:text-slate-50'
                  href='#'>
                  <ShoppingCartIcon className='h-5 w-5' />
                  <span className='sr-only'>Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Orders</TooltipContent>
            </Tooltip>
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
            <Tooltip>
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
            </Tooltip>
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
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
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
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <Tabs defaultValue='all'>
            <div className='flex items-center'>
              <TabsList>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='active'>Active</TabsTrigger>
                <TabsTrigger value='draft'>Draft</TabsTrigger>
                <TabsTrigger className='hidden sm:flex' value='archived'>
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className='ml-auto flex items-center gap-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className='h-8 gap-1' size='sm' variant='outline'>
                      <ListFilterIcon className='h-3.5 w-3.5' />
                      <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className='h-8 gap-1' size='sm' variant='outline'>
                  <FileIcon className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Export
                  </span>
                </Button>
                <Button className='h-8 gap-1' size='sm'>
                  <CirclePlusIcon className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Add Product
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value='all'>
              <Card x-chunk='dashboard-06-chunk-0'>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Manage your projects and manage its services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                    {projects?.map(project => {
                      return (
                        <Card
                          key={project?.id}
                          x-chunk='dashboard-01-chunk-0'
                          className='cursor-pointer'
                          onClick={() => {
                            router.push(`/project/${project?.id}`)
                          }}>
                          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                              {project?.services?.length} services
                            </CardTitle>
                            {project?.icon}
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold'>
                              {project?.title}
                            </div>
                            <p className='text-xs text-slate-500 dark:text-slate-400'>
                              {project?.description}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default DashboardView
