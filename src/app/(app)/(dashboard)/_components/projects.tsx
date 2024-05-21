import { Icons } from '../../(marketing)/(non-protected)/[[...route]]/_components/icons'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Projects = ({
  setShowCreateAlert,
}: {
  setShowCreateAlert: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const projects = [
    {
      id: 'kjsndvksjnvjsnv',
      name: 'new project',
      description: 'This is a new project',
    },
  ]

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8 md:py-3'>
        <div className='max-w-8xl mx-auto grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card
            className='cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-lg'
            onClick={() => setShowCreateAlert(true)}>
            <CardHeader className='flex flex-row items-center gap-4'>
              <Icons.add className='h-8 w-8' />
              <div className='grid gap-1'>
                <CardTitle>Add Project</CardTitle>
                <CardDescription>Click to add a new project</CardDescription>
              </div>
            </CardHeader>
          </Card>
          {/* {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))} */}
        </div>
      </main>
    </div>
  )
}

export default Projects
