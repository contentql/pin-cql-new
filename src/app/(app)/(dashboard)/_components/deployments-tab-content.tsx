import { Circle, EllipsisVertical, Star } from 'lucide-react'

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const DeploymentCard = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <div className='space-y-1'>
          <CardTitle>shadcn/ui</CardTitle>
          <CardDescription>
            Beautifully designed components built with Radix UI and Tailwind
            CSS.
          </CardDescription>
        </div>
        <div className='flex items-center space-x-6 rounded-md bg-secondary text-secondary-foreground'>
          <Button variant='secondary' className='px-3'>
            View Logs
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' className='px-1.5'>
                <EllipsisVertical className='h-4 w-4 text-secondary-foreground' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              alignOffset={-5}
              className='w-[200px]'
              forceMount>
              <DropdownMenuCheckboxItem checked>
                Future Ideas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4 text-sm text-muted-foreground'>
          <div className='flex items-center'>
            <Circle className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
            TypeScipt
          </div>
          <div className='flex items-center'>
            <Star className='mr-1 h-3 w-3' />
            10k
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  )
}

const DeploymentsTabContent = () => {
  return (
    <div className='grid grid-cols-1 gap-8'>
      <DeploymentCard />
    </div>
  )
}

export default DeploymentsTabContent
