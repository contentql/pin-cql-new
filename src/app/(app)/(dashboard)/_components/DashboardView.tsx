'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

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

  const projectTabs = [
    {
      value: 'all',
      label: 'All',
    },
    // {
    //   value: 'active',
    //   label: 'Active',
    // },
    // {
    //   value: 'deploying',
    //   label: 'Deploying',
    // },
    // {
    //   value: 'failed',
    //   label: 'Failed',
    // },
  ]

  const {
    data: userProjects,
    error,
    refetch: getProjectsRefetch,
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
      toast.error('Project creation failed')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getProjectKeys })
    },
  })

  const { mutate: createNewDeploymentByProjectName } =
    trpc.vercel.createNewDeploymentByProjectName.useMutation()

  const { mutate: createWebhookByProjectId } =
    trpc.vercel.createWebhookByProjectId.useMutation({
      onSuccess: async () => {},
    })

  const { mutate: templateUpdate } = trpc.railway.templateUpdate.useMutation()

  const { mutateAsync: templateDeploy, isPending: isTemplateDeploying } =
    trpc.vercel.createProjectWithGithubRepo.useMutation({
      onSuccess: async data => {
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
          toast.error('Error during project setup')
        }
      },
      onError: () => {
        console.log('Template creation failed')
        toast.error('Template creation failed')
      },
    })

  const handleAddProject = async (data: any) => {
    setIsDialogOpen(false)

    try {
      toast.promise(templateDeploy({ data }), {
        loading: 'Deploying...',
        success: 'Deployment successful!',
        error: 'Deployment failed',
      })
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
                    Please provide all variable fields asked below.
                  </DialogDescription>
                </DialogHeader>
                <VariablesForm
                  setServiceVariable={setServiceVariable}
                  handleAddProject={handleAddProject}
                  isTemplateDeploying={isTemplateDeploying}
                  setIsDialogOpen={setIsDialogOpen}
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
                <div className='dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative h-[50rem] w-full bg-white dark:bg-black'>
                  {/* Radial gradient for the container to give a faded look */}
                  <div className='pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black'></div>
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
