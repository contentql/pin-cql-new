'use client'

import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { trpc } from '@/trpc/client'

export const DashboardProjectCard = ({ project }: { project: any }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [projectName, setProjectName] = useState(project?.name || '')
  const [toggleNameEdit, setToggleNameEdit] = useState(false)

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
    trpc.railway.templateDelete.useMutation({
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
        id: templateId,
      })
    } catch (error) {
      console.log(error)
      throw new Error('Template deletion failed')
    }
  }

  return (
    <div>
      <Card
        key={project?.projectId}
        x-chunk='dashboard-01-chunk-0'
        className='cursor-pointer relative group'
        onClick={() => {
          router.push(`/project/${project?.projectId}`)
        }}>
        <div className='w-6 h-6 rounded-full bg-black border border-gray-500 absolute -top-3 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
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
                }}>
                Services
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                }}>
                Deployments
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-600'
                onClick={e => {
                  e.stopPropagation()
                  handleTemplateDelete({
                    templateId: project?.projectId,
                  })
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
            <Input placeholder='Enter new project name' value={projectName} />
          ) : (
            <div className='text-2xl font-bold'>{projectName}</div>
          )}
          <p className='text-xs pt-6 text-slate-500 dark:text-slate-400'>
            {project?.projectId}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
