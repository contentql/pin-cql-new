'use client'

import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { Check, Settings, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { trpc } from '@/trpc/client'

export const DashboardProjectCard = ({ project }: any) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [projectName, setProjectName] = useState(project?.name || '')
  const [toggleNameEdit, setToggleNameEdit] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [isAllowedToDelete, setIsAllowedToDelete] = useState(false)

  const { data: user } = trpc.user.getUser.useQuery()

  const cardBorder = () => {
    switch (user?.plan) {
      case 'Basic':
        return 'hover:border-blue-500'
      case 'Creator':
        return 'hover:border-green-500'
      case 'Team':
        return 'hover:border-purple-500'
      default:
        return 'hover:border-black'
    }
  }

  const border = cardBorder()

  const { mutate: updateProject } = trpc.projects.updateProjectName.useMutation(
    {
      onSuccess: async data => {
        setToggleNameEdit(false)
        toast.success('Project updated successfully')
      },
    },
  )

  const { mutate: templateUpdate } = trpc.railway.templateUpdate.useMutation({
    onSuccess: async data => {
      updateProject({
        id: project?.id,
        name: projectName,
      })
    },
  })

  const getProjectKeys = getQueryKey(
    trpc.projects.getProjects,
    undefined,
    'query',
  )

  const { mutate: deleteProject } = trpc.projects.deleteProject.useMutation({
    onError: () => {
      toast.error('Project deletion failed')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getProjectKeys })
    },
    onSuccess: () => {
      toast.success('Project deleted successfully')
      console.log('Project deleted successfully')
    },
  })

  const { mutate: templateDelete, isPending: isTemplateDeleting } =
    trpc.vercel.deleteProjectNameOrId.useMutation({
      onSuccess: () => {
        console.log('Template deleted successfully')
        try {
          deleteProject({
            id: project?.id,
          })
        } catch (error) {
          console.log(error)
        }
      },
      onError: () => {
        toast.error('Template deletion failed')
      },
    })

  const handleTemplateDelete = ({ templateId }: any) => {
    try {
      templateDelete({
        projectNameOrId: templateId,
      })
    } catch (error) {
      console.log(error)
      throw new Error('Template deletion failed')
    }
  }

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation()
    try {
      templateUpdate({
        id: project?.projectId,
        input: {
          name: projectName,
          description: '',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-2 md:text-2xl'>
              Are you sure?
            </DialogTitle>
            <DialogDescription className='text-base dark:text-white'>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Label>
            Type{' '}
            <span className='rounded-md border bg-zinc-50 p-0.5 italic dark:border-zinc-700 dark:bg-zinc-800'>
              {projectName}
            </span>{' '}
            to confirm
          </Label>
          <Input
            type='text'
            placeholder='We are sad to see you go!'
            value={confirmation}
            onChange={e => {
              setConfirmation(e.target.value)
              if (e.target.value === projectName) {
                setIsAllowedToDelete(true)
              } else {
                setIsAllowedToDelete(false)
              }
            }}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Close
              </Button>
            </DialogClose>

            <Button
              variant='destructive'
              onClick={() => {
                handleTemplateDelete({
                  templateId: project?.projectId,
                })
              }}
              disabled={!isAllowedToDelete || isTemplateDeleting}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card
        key={project?.projectId}
        x-chunk='dashboard-01-chunk-0'
        className={`w-50 group relative cursor-pointer bg-white duration-300 ${border}`}
        onClick={() => {
          router.push(`/project/${project?.name}`)
        }}>
        <div className='absolute -right-2 -top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings color='white' size='15' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel
                onClick={e => {
                  e.stopPropagation()
                }}>
                Project Settings
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                  router.push(`/project/${project?.projectId}`)
                }}>
                Services
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                  setToggleNameEdit(true)
                }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-600'
                onClick={e => {
                  e.stopPropagation()
                  // handleTemplateDelete({
                  //   templateId: project?.projectId,
                  // })

                  setIsDialogOpen(true)
                }}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {/* {project?.services?.length} services */}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{/* {project?.icon} */}</TooltipTrigger>
              <TooltipContent>{/* <p>{project?.status}</p> */}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          {toggleNameEdit ? (
            <div className='flex items-center gap-1'>
              <Input
                type='text'
                placeholder='Enter new project name'
                onChange={e => {
                  setProjectName(e.target.value)
                }}
                onClick={e => e.stopPropagation()}
                value={projectName}
                className='h-fit py-1 focus-visible:ring-0 focus-visible:ring-offset-0 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0'
              />

              <X
                color='red'
                className='ml-4 h-5 w-5 cursor-pointer'
                onClick={e => {
                  e.stopPropagation()
                  setToggleNameEdit(false)
                }}
              />
              <Check
                color='green'
                onClick={e => handleEdit(e)}
                className='ml-4 h-5 w-5 cursor-pointer'
              />
            </div>
          ) : (
            <div className='truncate text-2xl font-bold'>{projectName}</div>
          )}
          <p className='pt-6 text-xs text-slate-500 dark:text-slate-400'>
            {project?.projectId}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
