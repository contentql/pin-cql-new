import {
  ActivityIcon,
  CirclePlusIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileIcon,
  ListFilterIcon,
  UsersIcon,
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ProjectView = () => {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <Tabs defaultValue='all'>
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='draft'>Draft</TabsTrigger>
            <TabsTrigger className='hidden sm:flex' value='archived'>
              Archived
            </TabsTrigger>
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
            <Button className='h-8 gap-1' size='sm'>
              <CirclePlusIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value='all'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage your services and variables.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                <Card x-chunk='dashboard-01-chunk-0' className='cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Revenue
                    </CardTitle>
                    <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-1'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Subscriptions
                    </CardTitle>
                    <UsersIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-2'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <CreditCardIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-01-chunk-3'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Now
                    </CardTitle>
                    <ActivityIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default ProjectView
