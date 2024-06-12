'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'

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
  const [messages, setMessages] = useState<string[]>([])

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
  } = trpc.projects.getProjects.useQuery()

  const projects = userProjects?.docs

  const getProjectKeys = getQueryKey(
    trpc.projects.getProjects,
    undefined,
    'query',
  )

  const { mutate: createProject } = trpc.projects.createProject.useMutation({
    onSuccess: async () => {
      console.log('Project created')
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
        setMessages(prev => [...prev, 'Deployment started successfully'])
      },
      onError: async () => {
        setMessages(prev => [...prev, 'Error Deploying'])
      },
    })

  const { mutate: createWebhookByProjectId } =
    trpc.vercel.createWebhookByProjectId.useMutation({
      onSuccess: async () => {
        setMessages(prev => [...prev, 'Webhook attacked successfully'])
      },
      onError: async () => {
        setMessages(prev => [...prev, 'Error attaching webhook'])
      },
    })

  const { mutate: templateUpdate } = trpc.railway.templateUpdate.useMutation()

  const { mutateAsync: templateDeploy, isPending: isTemplateDeploying } =
    trpc.vercel.createProjectWithGithubRepo.useMutation({
      onSuccess: async data => {
        setMessages(prev => [...prev, 'Project created successfully'])
        try {
          createWebhookByProjectId({
            url: 'https://webhook.site/2afc2c37-e7a1-40e3-9292-ae8d9a8fcee1',
            events: ['deployment.created', 'deployment.succeeded'],
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
          })

          console.log('All operations completed successfully')
        } catch (error) {
          console.log('Error in operations:', error)
        }
      },
      onError: () => {
        console.log('Template creation failed')
        setMessages(prev => [...prev, 'Error creating project'])
      },
    })

  const handleAddProject = async (data: any) => {
    try {
      await templateDeploy({ data })
    } catch (error) {
      console.log(error)
    }
  }

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
                <Button variant='outline'>New Project</Button>
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
                  setMessages={setMessages}
                />
                <DialogClose asChild>close</DialogClose>
              </DialogContent>
            </Dialog>
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
    </main>
  )
}

export default DashboardView
