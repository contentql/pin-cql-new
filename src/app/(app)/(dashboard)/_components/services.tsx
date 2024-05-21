'use client'

import { X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import {
  CirclePlusIcon,
  DollarSignIcon,
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

import DeploymentsTabContent from './deployments-tab-content'
import MetricsTabContent from './metrics-tab-content'
import SettingsTabContent from './settings-tab-content'
import VariablesTabContent from './variables-tab-content'

interface ServicesProps {
  vertical?: boolean
}

const Services: React.FC<ServicesProps> = ({ vertical }) => {
  const router = useRouter()
  const params = useParams()

  const projectId = params.projectId

  const services = projects.find(project => project.id === projectId)?.services

  const serviceDetailsTabs = [
    {
      value: 'deployments',
      label: 'Deployments',
      content: <DeploymentsTabContent />,
    },
    {
      value: 'variables',
      label: 'Variables',
      content: <VariablesTabContent />,
    },
    { value: 'metrics', label: 'Metrics', content: <MetricsTabContent /> },
    { value: 'settings', label: 'Settings', content: <SettingsTabContent /> },
  ]

  return (
    <main
      className={`grid flex-1 ${vertical && 'grid-cols-[26%_72%]'} items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8`}>
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
          {!vertical && (
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
          )}
        </div>
        <TabsContent value='all'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage your services and variables.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`grid ${vertical ? 'grid grid-cols-1 gap-8' : 'gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'}`}>
                {services?.map(service => {
                  return (
                    <Card
                      key={service.id}
                      x-chunk='dashboard-01-chunk-0'
                      className='cursor-pointer'
                      onClick={() => {
                        router.push(
                          `/project/${projectId}/service/${service?.id}`,
                        )
                      }}>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                          {service?.updatedAt}
                        </CardTitle>
                        <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>
                          {service?.name}
                        </div>
                        <p className='text-xs text-slate-500 dark:text-slate-400'>
                          {service?.description}
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
      {vertical && (
        <Card x-chunk='dashboard-06-chunk-0' className='p-4'>
          <CardHeader className='flex-row justify-between'>
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage your services and variables.
              </CardDescription>
            </div>
            <X className='w-5 h-5' onClick={() => {}} />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={serviceDetailsTabs?.at(0)?.value}>
              <TabsList>
                {serviceDetailsTabs?.map(tab => {
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className='rounded-md'>
                      {tab?.label || tab.value}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
              {serviceDetailsTabs?.map(tab => {
                return (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className='pt-4'>
                    {tab?.content}
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export default Services
