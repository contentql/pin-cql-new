'use client'

import { X } from 'lucide-react'

import DeploymentsTabContent from '@/app/(app)/(dashboard)/_components/deployments-tab-content'
import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from '@/app/(app)/(dashboard)/_components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const VariablesContent = () => {
  return <div>Content for Variables</div>
}

const MetricsContent = () => {
  return <div>Content for Metrics</div>
}

const SettingsContent = () => {
  return <div>Content for Settings</div>
}

const ServiceView = () => {
  const tabs = [
    {
      value: 'deployments',
      label: 'Deployments',
      content: <DeploymentsTabContent />,
    },
    { value: 'variables', label: 'Variables', content: <VariablesContent /> },
    { value: 'metrics', label: 'Metrics', content: <MetricsContent /> },
    { value: 'settings', label: 'Settings', content: <SettingsContent /> },
  ]

  return (
    <main className='grid grid-cols-[26%_72%] flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
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
              <div className='grid grid-cols-1 gap-8'>
                <Card x-chunk='dashboard-01-chunk-0' className='cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Revenue
                    </CardTitle>
                    <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-1'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Subscriptions
                    </CardTitle>
                    <UsersIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-2'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <CreditCardIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-3'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Now
                    </CardTitle>
                    <ActivityIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
          <Tabs defaultValue={tabs?.at(0)?.value}>
            <TabsList>
              {tabs?.map(tab => {
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
            {tabs?.map(tab => {
              return (
                <TabsContent key={tab.value} value={tab.value} className='pt-4'>
                  {tab?.content}
                </TabsContent>
              )
            })}
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}

export default ServiceView
