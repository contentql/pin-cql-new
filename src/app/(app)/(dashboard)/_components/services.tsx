'use client'

import { LinkIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import SettingsTabContent from '@/app/(app)/(dashboard)/_components/settings-tab-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { trpc } from '@/trpc/client'

import DeploymentsTabContent from './deployments-tab-content'

const Services = () => {
  const router = useRouter()
  const params = useParams()

  const vertical = true

  const projectId = params.projectId?.toString()

  const [isVisible, setIsVisible] = useState(true)
  const [variables, setVariables] = useState<any>({})
  const [showNotification, setShowNotification] = useState(false)

  const { data: fetchedProjectData } =
    trpc.vercel.getProjectByNameOrId.useQuery({
      projectNameOrId: projectId,
    })

  console.log('fetched project', fetchedProjectData)

  const deployments = fetchedProjectData?.latestDeployments

  const serviceDetailsTabs = [
    {
      value: 'deployments',
      label: 'Deployments',
      content: (
        <DeploymentsTabContent
          deployments={fetchedProjectData?.latestDeployments}
        />
      ),
    },
    // {
    //   value: 'variables',
    //   label: 'Variables',
    //   content: variables ? (
    //     <VariablesTabContent variables={fetchedProjectData?.env} />
    //   ) : (
    //     <div>Loading variables...</div>
    //   ),
    // },
    // { value: 'metrics', label: 'Metrics', content: <MetricsTabContent /> },
    {
      value: 'settings',
      label: 'Settings',
      content: <SettingsTabContent projectId={projectId} />,
    },
  ]

  const getDotClass = () => {
    switch (fetchedProjectData?.targets.production.readyState) {
      case 'READY':
        return {
          backGround: 'bg-green-500',
          text: 'text-green-500',
        }
      case 'ERROR':
        return {
          backGround: 'bg-red-500',
          text: 'text-red-500',
        }
      case 'BUILDING':
        return {
          backGround: 'bg-blue-500',
          text: 'text-blue-500',
        }
      default:
        return 'bg-gray-200'
    }
  }

  const dot:
    | 'bg-gray-200'
    | {
        backGround: string
        text: string
      } = getDotClass()

  return (
    <main
      className={`grid flex-1 ${vertical && 'grid-cols-[26%_72%]'} items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8`}>
      {/* <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader>
          <CardTitle>Project</CardTitle>
          <CardDescription>Manage your project and variables.</CardDescription>
        </CardHeader>
        <CardContent> */}
      <div
        className={`grid ${vertical ? 'grid-cols-1 gap-8' : 'gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'}`}>
        <Card
          key={fetchedProjectData?.id}
          x-chunk='dashboard-01-chunk-0'
          className='relative cursor-pointer  border-r-2 border-gray-200 hover:border-gray-400'
          // onClick={() => {
          //   router.push(
          //     `/project/${projectId}/service/${service?.node.id}`,
          //   )
          // }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
            <div className='flex items-center gap-2'>
              <div
                className={`absolute ${typeof dot === 'string' ? dot : dot.backGround} h-3 w-3 rounded-full`}
              />
              <CardTitle
                className={`text-sm ${typeof dot === 'string' ? dot : dot.text} pl-4 font-medium`}>
                {fetchedProjectData?.targets.production.readyState}
              </CardTitle>
            </div>
            {/* {service?.icon} */}
          </CardHeader>
          <CardContent>
            <div className='truncate text-xl font-bold'>
              {fetchedProjectData?.name}
            </div>
            {fetchedProjectData && (
              <p className='flex items-center gap-2 pt-4 text-sm text-slate-500 dark:text-slate-400'>
                <LinkIcon size={15} />

                <Link
                  href={`https://${fetchedProjectData?.targets.production.url}`}
                  rel='noopener noreferrer'
                  target='_blank'>
                  latest deployment
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* </CardContent>
      </Card> */}
      {vertical && (
        <Card
          x-chunk='dashboard-06-chunk-0'
          className={`transform border-double p-4 transition-transform duration-300 ease-in-out  ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
          <CardHeader className='flex-row justify-between'>
            <div>
              <CardTitle>{fetchedProjectData?.name}</CardTitle>
            </div>
            <X
              className='h-5 w-5 cursor-pointer'
              onClick={() => {
                router.push('/dashboard')
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
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className='mt-4'>
                    {tab?.content}
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {showNotification && (
        <div className='fixed bottom-4 right-4 flex items-center rounded-lg bg-gray-800 p-4 text-white shadow-lg'>
          <span className='mr-4'>Variable changes need to deploy</span>
          <Button
          // onClick={() => {
          //   handleRedeploy()
          // }}
          >
            Deploy
          </Button>
        </div>
      )}
    </main>
  )
}

export default Services
