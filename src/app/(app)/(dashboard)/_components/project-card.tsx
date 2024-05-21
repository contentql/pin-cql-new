import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ProjectCard = ({
  project,
}: {
  project: { id: string; name: string; description: string }
}) => {
  const { id, name, description } = project

  const router = useRouter()

  return (
    <Card
      className='relative cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-lg'
      onClick={() => router.push(`/project/${id}`)}>
      <CardHeader className='flex flex-row items-center gap-4'>
        <div className='grid gap-1'>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='text-sm font-semibold'>Last update: 3 hours ago</div>
        <div className='absolute right-2 top-2 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600'></div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
