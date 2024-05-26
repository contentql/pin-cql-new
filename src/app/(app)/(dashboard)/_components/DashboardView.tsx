'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { trpc } from '@/trpc/client'

import { DashboardProjectCard } from './Dashboard-project-card'
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

  const {
    data: userProjects,
    error,
    refetch: getProjectsRefetch,
  } = trpc.projects.getProjects.useQuery()

  const projects = userProjects?.docs

  console.log(projects)

  const getProjectKeys = getQueryKey(
    trpc.projects.getProjects,
    undefined,
    'query',
  )

  // const { mutate: deleteProject } = trpc.projects.deleteProject.useMutation({
  //   onError: () => {
  //     toast.error('Project deletion failed')
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: getProjectKeys })
  //   },
  //   onSuccess: () => {
  //     toast.success('Project deleted successfully')
  //     console.log('Project deleted successfully')
  //   },
  // })

  // const { mutate: templateDelete, isPending: isTemplateDeleting } =
  //   trpc.railway.templateDelete.useMutation({
  //     onSuccess: () => {
  //       console.log('Template deleted successfully')
  //     },
  //     onError: () => {
  //       toast.error('Template deletion failed')
  //     },
  //   })

  // // const handleTemplateDelete = ({ templateId, projectId }: any) => {
  // //   try {
  // //     templateDelete({
  // //       id: templateId,
  // //     })
  // //   } catch (error) {
  // //     console.log(error)
  // //     throw new Error('Template deletion failed')
  // //   }
  // //   try {
  // //     deleteProject({
  // //       id: projectId,
  // //     })
  // //   } catch (error) {
  // //     console.log(error)
  // //   }
  // // }

  // const handleTemplateDelete = async ({ templateId, projectId }: any) => {
  //   try {
  //     const templateDeleteResponse: any = await templateDelete({
  //       id: templateId,
  //     })

  //     console.log(templateDelete)
  //     if (!templateDeleteResponse?.success) {
  //       console.error(
  //         'Template deletion failed:',
  //         templateDeleteResponse?.error,
  //       )
  //       // throw new Error('Template deletion failed')
  //       return
  //     }
  //     await deleteProject({ id: projectId })
  //   } catch (error) {
  //     console.error(error)
  //     throw new Error('Template deletion failed')
  //   }

  //   console.log('Template and project deleted successfully')
  // }

  const { mutate: createProject } = trpc.projects.createProject.useMutation({
    onSuccess: async () => {
      console.log('Project created')
      toast.success('Project created successfully')
    },
    onError: async () => {
      console.log('Project creation failed')
      toast.error('Project creation failed')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getProjectKeys })
    },
  })

  const { mutate: templateDeploy, isPending: isTemplateDeploying } =
    trpc.railway.templateDeploy.useMutation({
      onSuccess: async data => {
        try {
          setIsDialogOpen(false)
          createProject({
            name: serviceVariable?.Project_Name,
            projectId: data.railway.templateDeploy.projectId,
            workflowId: data.railway.templateDeploy.workflowId,
          })
        } catch (error) {
          console.log(error)
        }
      },
      onError: async () => {
        console.log('Template creation failed')
        toast.error('Template creation failed')
      },
    })

  const handleAddProject = (data: any) => {
    try {
      templateDeploy({
        data,
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant='outline'>Add Project</Button>
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
                />
                <DialogClose asChild>close</DialogClose>
              </DialogContent>
            </Dialog>
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
                      // ?.filter(
                      //   project =>
                      //     tab?.value === 'all' ||
                      //     project?.status.toLowerCase() === tab?.value,
                      // )
                      ?.map((project: any) => (
                        <div key={project.id}>
                          <DashboardProjectCard project={project} />
                        </div>
                      ))}
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
