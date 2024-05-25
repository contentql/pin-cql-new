import '@radix-ui/react-dropdown-menu'
import { Box, Database, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'

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

interface DeploymentsTabContentProps {
  deployments: (typeof projects)[0]['services'][0]['deployments']
}

const DeploymentsTabContent: React.FC<DeploymentsTabContentProps> = ({
  deployments,
}: {
  deployments: any
}) => {
  console.log('deployments tab content', deployments)
  return (
    <div className='grid grid-cols-1 gap-8'>
      {deployments?.edges.map((deployment: any) => {
        return (
          <Card
            key={deployment.node.id}
            className={`${deployment?.node.status === 'REMOVED' && 'opacity-65'}`}>
            <CardHeader className='flex flex-row justify-between'>
              <div className='space-y-1'>
                <CardTitle>
                  <Link href={`https://${deployment?.node.staticUrl || '#'}`}>
                    {deployment?.node.staticUrl}
                  </Link>
                </CardTitle>
                <CardDescription className='pt-2'>
                  {deployment?.node?.status}
                </CardDescription>
              </div>
              <div className='flex items-center space-x-4 rounded-md bg-secondary text-secondary-foreground'>
                <Button variant='secondary' className='px-3'>
                  View Logs
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='secondary' className='px-1.5'>
                      <EllipsisVertical className='h-4 w-4 text-secondary-foreground' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' alignOffset={-5} forceMount>
                    <DropdownMenuItem>View Logs</DropdownMenuItem>
                    <DropdownMenuItem>Restart</DropdownMenuItem>
                    <DropdownMenuItem>Redeploy</DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex space-x-4 text-sm text-muted-foreground'>
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
