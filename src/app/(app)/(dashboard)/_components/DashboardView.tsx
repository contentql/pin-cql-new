'use client'

import { useRouter } from 'next/navigation'

import {
  CirclePlusIcon,
  FileIcon,
  ListFilterIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
import { projects } from '@/app/(app)/(dashboard)/_data'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const DashboardView = () => {
  const router = useRouter()

  const projectTabs = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'deploying',
      label: 'Deploying',
    },
    {
      value: 'failed',
      label: 'Failed',
    },
  ]

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <Tabs defaultValue='all'>
        <div className='flex items-center'>
          <TabsList>
            {projectTabs?.map(tab => {
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className='rounded-md'>
                  {tab?.label}
                </TabsTrigger>
              )
            })}
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
                Add Project
              </span>
            </Button>
          </div>
        </div>
        {projectTabs?.map(tab => {
          return (
            <TabsContent key={tab.value} value={tab.value}>
              <Card x-chunk='dashboard-06-chunk-0'>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Manage your projects and manage its services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                    {projects
                      ?.filter(
                        project =>
                          tab?.value === 'all' ||
                          project?.status.toLowerCase() === tab?.value,
                      )
                      ?.map(project => {
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
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    {project?.icon}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{project?.status}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
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
          )
        })}
      </Tabs>
    </main>
  )
}

export default DashboardView
