import '@radix-ui/react-dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { Box, Database, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { projects } from '@/app/(app)/(dashboard)/_data'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { trpc } from '@/trpc/client'

interface DeploymentsTabContentProps {
  deployments: (typeof projects)[0]['services'][0]['deployments']
}

const DeploymentsTabContent: React.FC<DeploymentsTabContentProps> = ({
  deployments,
}: {
  deployments: any
}) => {
  const params = useParams()
  const { serviceId } = params
  const queryClient = useQueryClient()

  const getDetailsKeys = getQueryKey(
    trpc.railway.getDetails,
    undefined,
    'query',
  )

  const serviceDeployments = deployments?.edges.filter(
    (deployment: any) => deployment.node.serviceId === serviceId,
  )

  const { mutateAsync: deploymentReDeploy } =
    trpc.railway.deploymentReDeploy.useMutation({
      onSuccess: data => {
        console.log('redeployment sucessfully deployed')
      },
      onSettled: newTodo => {
        queryClient.invalidateQueries({ queryKey: getDetailsKeys })
      },
    })

  const handleRedeploy = async (id: string) => {
    const reDeploy: any = deploymentReDeploy({
      id,
    })

    toast.promise(reDeploy, {
      loading: 'Deploying...',
      success: data => {
        return `Deployment successfully`
      },
      error: 'Error',
    })
  }

  const serviceDeploymentsSorted = serviceDeployments?.sort(
    (a: any, b: any) => {
      const dateA: number = new Date(a.node.createdAt).getTime()
      const dateB: number = new Date(b.node.createdAt).getTime()
      return dateB - dateA
    },
  )

  return (
    <div className='grid grid-cols-1 gap-8'>
      {serviceDeploymentsSorted?.map((deployment: any) => {
        return (
          <Card
            key={deployment.node.id}
            className={`${deployment?.node.status === 'REMOVED' && 'opacity-65'}`}>
            <CardHeader className='flex flex-row justify-between'>
              <div className='space-y-1'>
                <CardTitle>
                  {deployment?.node.staticUrl && (
                    <Link
                      href={`https://${deployment?.node.staticUrl}`}
                      rel='noopener noreferrer'
                      target='_blank'>
                      {deployment?.node.staticUrl}
                    </Link>
                  )}
                </CardTitle>
                <CardDescription className='pt-2'>
                  {deployment?.node?.status}
                </CardDescription>
              </div>
              <div className='bg-secondary text-secondary-foreground flex items-center space-x-4 rounded-md'>
                <Button variant='secondary' className='px-3'>
                  View Logs
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='secondary' className='px-1.5'>
                      <EllipsisVertical className='text-secondary-foreground h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' alignOffset={-5} forceMount>
                    <DropdownMenuItem>View Logs</DropdownMenuItem>
                    <DropdownMenuItem>Restart</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRedeploy(deployment.node.id)}>
                      Redeploy
                    </DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-muted-foreground flex space-x-4 text-sm'>
                <div className='flex items-center'>
                  {deployment?.node.meta?.image &&
                  deployment?.node.meta?.image === 'mongo' ? (
                    <>
                      <Database className='mr-1 h-4 w-4' />
                      {deployment?.node.meta?.image}
                    </>
                  ) : (
                    <>
                      <Box className='mr-1 h-4 w-4' />
                      {deployment?.node.meta?.image}
                    </>
                  )}
                  {/* {deployment?.node.meta?.branch && (
                    <>
                      <GitCommit className='mr-1 h-4 w-4' />
                      Github
                    </>
                  )} */}
                </div>
                {/* {deployment?.meta?.branch && (
                  <div className='flex items-center'>
                    <GitBranch className='mr-1 w-4 h-4' />
                    {deployment?.meta?.branch}
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DeploymentsTabContent
