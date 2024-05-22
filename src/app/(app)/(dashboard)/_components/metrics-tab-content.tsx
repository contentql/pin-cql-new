import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const BarChart: React.FC<BarChartProps> = props => {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: 'Jan', count: 111 },
          { name: 'Feb', count: 157 },
          { name: 'Mar', count: 129 },
          { name: 'Apr', count: 150 },
          { name: 'May', count: 119 },
          { name: 'Jun', count: 72 },
        ]}
        keys={['count']}
        indexBy='name'
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#2563eb']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  )
}

const LineChart: React.FC<LineChartProps> = props => {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 },
            ],
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role='application'
      />
    </div>
  )
}

const MetricsTabContent = () => {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='grid gap-6'>
        <div className='grid md:grid-cols-3 gap-6'>
          <Card className='flex flex-col'>
            <CardHeader>
              <CardDescription>Total Sales</CardDescription>
              <CardTitle>$2389.00</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className='w-full aspect-[4/3]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sessions</CardDescription>
              <CardTitle>345</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className='w-full aspect-[4/3]' />
            </CardContent>
          </Card>
          <Card className='flex flex-col'>
            <CardHeader>
              <CardDescription>Returning Customers</CardDescription>
              <CardTitle>33.5%</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className='w-full aspect-[4/3]' />
            </CardContent>
          </Card>
        </div>
        <div className='grid md:grid-cols-2 gap-6'>
          <Card className='flex flex-col'>
            <CardHeader>
              <CardDescription>Top Products</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>Product 1</TableCell>
                    <TableCell>200</TableCell>
                    <TableCell>300</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Product 2</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell>500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Product 3</TableCell>
                    <TableCell>225</TableCell>
                    <TableCell>400</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className='flex flex-col'>
            <CardHeader>
              <CardDescription>Top Referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='w-full aspect-[4/3]' />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default MetricsTabContent
