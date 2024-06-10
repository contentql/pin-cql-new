import '@radix-ui/react-dropdown-menu'
import { EllipsisVertical, GitBranch } from 'lucide-react'
import Link from 'next/link'

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

const DeploymentsTabContent = ({ deployments }: { deployments: any }) => {
  return (
    <div className='grid grid-cols-1 gap-8'>
      {deployments?.map((deployment: any) => {
        return (
          <Card
            key={deployment.id}
            className={`${deployment?.readyState === 'ERROR' && 'opacity-65'}`}>
            <CardHeader className='flex flex-row justify-between'>
              <div className='space-y-1'>
                <CardTitle>
                  {deployment?.url && (
                    <Link
                      href={`https://${deployment?.url}`}
                      rel='noopener noreferrer'
                      target='_blank'>
                      {deployment?.url}
                    </Link>
                  )}
                </CardTitle>
                <CardDescription className='pt-2'>
                  {deployment?.readyState}
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
                    // onClick={() => handleRedeploy(deployment.node.id)}
                    >
                      Redeploy
                    </DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-muted-foreground flex space-x-4 text-sm'>
                {deployment?.meta?.githubOrg && (
                  <div className='flex items-center'>
                    <GitBranch className='mr-1 h-4 w-4' />
                    {deployment?.meta?.githubOrg}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DeploymentsTabContent
