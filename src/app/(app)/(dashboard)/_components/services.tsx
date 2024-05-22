'use client'

import { X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import DeploymentsTabContent from '@/app/(app)/(dashboard)/_components/deployments-tab-content'
import {
  CirclePlusIcon,
  FileIcon,
  ListFilterIcon,
  statusIcons,
} from '@/app/(app)/(dashboard)/_components/icons'
import MetricsTabContent from '@/app/(app)/(dashboard)/_components/metrics-tab-content'
import SettingsTabContent from '@/app/(app)/(dashboard)/_components/settings-tab-content'
import VariablesTabContent from '@/app/(app)/(dashboard)/_components/variables-tab-content'
import { projects } from '@/app/(app)/(dashboard)/_data'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

interface ServicesProps {
  vertical?: boolean
}

const Services: React.FC<ServicesProps> = ({ vertical }) => {
  const router = useRouter()
  const params = useParams()

  const projectId = params.projectId
  const serviceId = params.serviceId

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (vertical) {
      setIsVisible(true)
    }
  }, [vertical])

  const services = projects?.find(project => project.id === projectId)?.services
  const service = services?.find(service => service.id === serviceId)

  const serviceDetailsTabs = [
    {
      value: 'deployments',
      label: 'Deployments',
      content: <DeploymentsTabContent deployments={service?.deployments} />,
    },
    {
      value: 'variables',
      label: 'Variables',
      content: <VariablesTabContent variables={service?.variables} />,
    },
    { value: 'metrics', label: 'Metrics', content: <MetricsTabContent /> },
    { value: 'settings', label: 'Settings', content: <SettingsTabContent /> },
  ]

  const serviceTabs = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'active',
      label: 'Active',
    },
    { value: 'sleep', label: 'Sleep' },
    { value: 'archived', label: 'Archived' },
  ]

  return (
    <main
      className={`grid flex-1 ${vertical && 'grid-cols-[26%_72%]'} items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8`}>
      <Tabs defaultValue='all'>
        <div className='flex items-center'>
          <TabsList>
            {serviceTabs?.map(tab => {
              return (
                <TabsTrigger key={tab.label} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              )
            })}
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
        {serviceTabs?.map(tab => {
          return (
            <TabsContent key={tab.value} value={tab.value}>
              <Card x-chunk='dashboard-06-chunk-0'>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>
                    Manage your services and variables.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`grid ${vertical ? 'grid-cols-1 gap-8' : 'gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'}`}>
                    {services
                      ?.filter(
                        service =>
                          tab.value === 'all' || service.status === tab.value,
                      )
                      ?.map(service => {
                        const latestDeployment = service?.deployments?.at(0)

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
                              {service?.icon}
                            </CardHeader>
                            <CardContent>
                              <div className='text-2xl font-bold'>
                                {service?.name}
                              </div>
                              <p className='text-xs text-slate-500 dark:text-slate-400'>
                                {service?.description}
                              </p>
                            </CardContent>
                            <CardFooter
                              className={`capitalize gap-1 ${latestDeployment?.status === 'CRASHED' && 'text-red-600'}`}>
                              {statusIcons({
                                status: latestDeployment?.status as string,
                              })}
                              {latestDeployment?.status.toLowerCase() ||
                                'No Deployments'}
                            </CardFooter>
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
      {vertical && (
        <Card
          x-chunk='dashboard-06-chunk-0'
          className={`p-4 shadow-xl shadow-cyan-100 border-double transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
          <CardHeader className='flex-row justify-between'>
            <div>
              <CardTitle>{service?.name}</CardTitle>
              <CardDescription>{service?.description}</CardDescription>
            </div>
            <X
              className='w-5 h-5 cursor-pointer'
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => {
                  router.push('../')
                }, 200)
              }}
            />
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
                  <TabsContent key={tab.value} value={tab.value}>
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
