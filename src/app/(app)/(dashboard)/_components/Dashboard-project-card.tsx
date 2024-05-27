'use client'

import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <div className='w-10 h-10 rounded-full bg-black border border-gray-500 absolute -top-4 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <Button
            disabled={isTemplateDeleting}
            variant='destructive'
            onClick={e => {
              e.stopPropagation()
              handleTemplateDelete({
                templateId: project?.projectId,
              })
            }}>
            Delete
          </Button>
        </div>
        {/* <div className='w-10 h-10 rounded-full bg-red-600 border border-gray-500 absolute -top-3 right-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                              <Delete  size={20} color='white' />
                            </div> */}
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
          <div className='text-2xl font-bold'>{project?.name}</div>
          <p className='text-xs pt-6 text-slate-500 dark:text-slate-400'>
            {project?.projectId}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
