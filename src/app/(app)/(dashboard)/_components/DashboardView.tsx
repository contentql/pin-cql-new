'use client'

import { useRouter } from 'next/navigation'

import {
  CirclePlusIcon,
  FileIcon,
  ListFilterIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
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
  )
}

export default DashboardView
