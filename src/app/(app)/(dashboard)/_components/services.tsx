'use client'

import { X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import MetricsTabContent from '@/app/(app)/(dashboard)/_components/metrics-tab-content'
import SettingsTabContent from '@/app/(app)/(dashboard)/_components/settings-tab-content'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { trpc } from '@/trpc/client'

import DeploymentsTabContent from './deployments-tab-content'
import VariablesTabContent from './variables-tab-content'

interface ServicesProps {
  vertical?: boolean
}

const Services: React.FC<ServicesProps> = ({ vertical }) => {
  const router = useRouter()
  const params = useParams()

  const projectId = params.projectId?.toString()
  const serviceId = params.serviceId?.toString()

  const [isVisible, setIsVisible] = useState(false)
  const [projectData, setProjectData] = useState<any>(null)
  const [variables, setVariables] = useState<any>({})

  const { data: fetchedProjectData } = trpc.railway.getDetails.useQuery({
    id: projectId,
  })

  useEffect(() => {
    setProjectData(fetchedProjectData)
  }, [fetchedProjectData])

  const environmentId =
    projectData?.railway.project.environments.edges[0].node.id

  const { mutate: getVariables } = trpc.railway.getVariables.useMutation({
    onSuccess: async data => {
      setVariables(data)
    },
    onError: async () => {
      console.log('Variables fetch failed')
    },
  })

  const { mutateAsync: serviceReDeploy } =
    trpc.railway.serviceReDeploy.useMutation()

  const handleRedeploy = async () => {
    const data: any = serviceReDeploy({
      environmentId: environmentId,
      serviceId: serviceId,
    })

    toast.promise(data, {
      loading: 'Deploying...',
      success: data => {
        return `Deployment successfully`
      },
      error: 'Error',
    })
  }

  const { mutate: templateUpdate } = trpc.railway.templateUpdate.useMutation({
    onSuccess: async data => {
      console.log('Variables updated')
      if (serviceId && environmentId) {
        getVariables({
          environmentId: environmentId,
          projectId: projectId,
          serviceId: serviceId,
        })
      }

      toast.success('Service Re-deploy', {
        description: 'Environment Variables updated',
        action: <Button onClick={() => handleRedeploy()}>Deploy</Button>,
        style: {},
      })
    },
    onError: async () => {
      console.log('Variables update failed')
    },
  })

  useEffect(() => {
    if (serviceId && environmentId) {
      getVariables({
        environmentId: environmentId,
        projectId: projectId,
        serviceId: serviceId,
      })
    }
  }, [serviceId, environmentId, projectId, getVariables])

  useEffect(() => {
    if (vertical) {
      setIsVisible(true)
    }
  }, [vertical])

  const services = projectData?.railway.project.services

  const service = services?.edges.find(
    (service: any) => service.node.id === serviceId,
  )

  const serviceDetailsTabs = [
    {
      value: 'deployments',
      label: 'Deployments',
      content: (
        <DeploymentsTabContent
          deployments={projectData?.railway.project.deployments}
        />
      ),
    },
    {
      value: 'variables',
      label: 'Variables',
      content: variables ? (
        <VariablesTabContent
          variables={variables?.railway?.variables}
          environmentId={environmentId}
          templateUpdate={templateUpdate}
        />
      ) : (
        <div>Loading variables...</div>
      ),
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
                <TabsTrigger
                  key={tab.label}
                  value={tab.value}
                  className='rounded-md'>
                  {tab.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
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
                    {services?.edges
                      // ?.filter(
                      //   service =>
                      //     tab.value === 'all' || service.status === tab.value,
                      // )
                      ?.map((service: any) => {
                        // const latestDeployment = service?.deployments?.at(0)

                        return (
                          <Card
                            key={service.node.id}
                            x-chunk='dashboard-01-chunk-0'
                            className='cursor-pointer'
                            onClick={() => {
                              router.push(
                                `/project/${projectId}/service/${service?.node.id}`,
                              )
                            }}>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                              <CardTitle className='text-sm font-medium'>
                                {/* {service?.updatedAt} */}
                              </CardTitle>
                              {/* {service?.icon} */}
                            </CardHeader>
                            <CardContent>
                              <div className='text-2xl font-bold'>
                                {service?.node.name}
                              </div>
                              <p className='text-xs text-slate-500 dark:text-slate-400 pt-4'>
                                {service?.node.id}
                              </p>
                            </CardContent>
                            {/* <CardFooter
                              className={`capitalize gap-1 ${latestDeployment?.status === 'CRASHED' && 'text-red-600'}`}>
                              {statusIcons({
                                status: latestDeployment?.status as string,
                              })}
                              {latestDeployment?.status.toLowerCase() ||
                                'No Deployments'}
                            </CardFooter> */}
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
    </main>
  )
}

export default Services
