'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { AlertCircle, CheckCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { trpc } from '@/trpc/client'

import { DashboardProjectCard } from './Dashboard-project-card'
import { EmptyProject } from './EmptyProject'
import VariablesForm from './VariablesForm'

const DashboardView = () => {
  const queryClient = useQueryClient()

  const [serviceVariable, setServiceVariable] = useState<any>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messages, setMessages] = useState<{ event: string }[]>([])

  const projectTabs = [
    {
      value: 'all',
      label: 'All',
    },
  ]

  const {
    data: userProjects,
    error,
    refetch: getProjectsRefetch,
    isLoading,
  } = trpc.projects.getProjects.useQuery(undefined, {
    refetchInterval: 10000,
  })

  const projects = userProjects?.docs || []

  const deployingProjects = projects?.filter(project => project.isDeploying)

  const newProjects = projects?.filter(project => project.isNewProject)

  const getProjectKeys = getQueryKey(
    trpc.projects.getProjects,
    undefined,
    'query',
  )

  const { data: user } = trpc.user.getUser.useQuery()

  const { mutate: updateProjectEvents } =
    trpc.projects.updateProjectEvents.useMutation()

  const { mutate: createProject } = trpc.projects.createProject.useMutation({
    onSuccess: async data => {
      try {
        updateProjectEvents({
          id: data.id,
          data: messages,
        })
      } catch (error) {
        console.log(error)
      }
    },
    onError: async () => {
      console.log('Project creation failed')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getProjectKeys })
    },
  })

  const { mutate: createNewDeploymentByProjectName } =
    trpc.vercel.createNewDeploymentByProjectName.useMutation({
      onSuccess: async () => {
        setMessages(prev => [
          ...prev,
          { event: 'Deployment started successfully' },
          { event: 'Deploying . . .' },
        ])
      },
      onError: async () => {
        setMessages(prev => [...prev, { event: 'Error Deploying' }])
      },
    })

  const { mutate: createWebhookByProjectId } =
    trpc.vercel.createWebhookByProjectId.useMutation({
      onSuccess: async () => {
        setMessages(prev => [
          ...prev,

          { event: 'Webhook attacked successfully' },
        ])
      },
      onError: async () => {
        setMessages(prev => [...prev, { event: 'Error attaching webhook' }])
      },
    })

  const { mutate: templateUpdate } = trpc.railway.templateUpdate.useMutation()

  const { mutateAsync: templateDeploy, isPending: isTemplateDeploying } =
    trpc.vercel.createProjectWithGithubRepo.useMutation({
      onSuccess: async data => {
        setMessages(prev => [
          ...prev,
          { event: 'Project created successfully' },
        ])
        try {
          createWebhookByProjectId({
            url: 'https://contentql.io/api/webhook/vercel',
            events: [
              'deployment.created',
              'deployment.succeeded',
              'deployment.error',
            ],
            projectIds: [data.id],
          })

          createNewDeploymentByProjectName({
            name: data.name,
            target: 'production',
            gitSource: {
              type: 'github',
              ref: 'main',
              repoId: 791460068,
            },
            source: 'import',
          })

          createProject({
            name: data?.name,
            projectId: data?.id,
            workflowId: data?.accountId,
            isNewProject: true,
          })

          console.log('All operations completed successfully')
        } catch (error) {
          console.log('Error in operations:', error)
        }
      },
      onError: () => {
        console.log('Template creation failed')
        setMessages(prev => [...prev, { event: 'Error creating project' }])
      },
    })

  const handleAddProject = async (data: any) => {
    try {
      await templateDeploy({ data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (deployingProjects?.length === 0 && newProjects?.length === 0) {
      setIsDialogOpen(false)
    }
  }, [projects])

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                {user?.plan === 'Basic' ? null : (
                  <Button variant='outline'>New Project</Button>
                )}
              </DialogTrigger>
              <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                  <DialogDescription>
                    Please provide required details asked below.
                  </DialogDescription>
                </DialogHeader>
                <VariablesForm
                  setServiceVariable={setServiceVariable}
                  handleAddProject={handleAddProject}
                  isTemplateDeploying={isTemplateDeploying}
                  setIsDialogOpen={setIsDialogOpen}
                  messages={messages}
                />
                <DialogClose asChild>close</DialogClose>
              </DialogContent>
            </Dialog>

            {deployingProjects
              ? deployingProjects?.length > 0 && (
                  <Dialog>
                    <DialogContent className='sm:max-w-[500px]'>
                      <DialogHeader>
                        <DialogTitle>Deploying your project</DialogTitle>
                        <DialogDescription>
                          Please wait your project is deploying.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <div className='mt-4 flex items-center justify-center'>
                          <svg
                            className='mr-2 h-5 w-5 animate-spin text-gray-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'>
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8v8H4z'></path>
                          </svg>
                          <div>Please wait processing...</div>
                        </div>
                        <div className='mt-4'>
                          {messages.map((message: any, index: number) => (
                            <div key={index}>
                              {message.event.includes('Error') ? (
                                <div className='flex items-center gap-2 p-2'>
                                  <AlertCircle color='red' />
                                  <p>{message.event}</p>
                                </div>
                              ) : (
                                <div className='flex items-center gap-2 p-2'>
                                  <CheckCheck color='green' />
                                  <p>{message.event}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogClose asChild>close</DialogClose>
                    </DialogContent>
                  </Dialog>
                )
              : null}
          </div>
        </div>
        {projectTabs?.map(tab => {
          return (
            <TabsContent key={tab.value} value={tab.value} className='h-screen'>
              <Card x-chunk='dashboard-06-chunk-0' className='min-h-full'>
                <div className='relative h-[50rem] w-full bg-dot-black/[0.2] dark:bg-black  dark:bg-dot-white/[0.2]'>
                  <div className='pointer-events-none absolute inset-0  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black'></div>
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                      Manage your projects and manage its services.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {projects?.length === 0 ? (
                      <EmptyProject setIsDialogOpen={setIsDialogOpen} />
                    ) : (
                      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
                        {projects?.map((project: any) => (
                          <div key={project.id}>
                            <DashboardProjectCard
                              project={project}
                              templateUpdate={templateUpdate}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
      {deployingProjects &&
        deployingProjects?.length > 0 &&
        deployingProjects.map(deployingProject => (
          <div
            key={deployingProject.name}
            className='fixed bottom-4 right-4 flex items-center gap-2 rounded-lg bg-black bg-opacity-75 p-4 text-white shadow-lg'>
            <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
            <p>{deployingProject.name} : Deploying . . .</p>
          </div>
        ))}
    </main>
  )
}

export default DashboardView
