import { Box, DollarSignIcon, Leaf } from 'lucide-react'

export const projects = [
  {
    id: 'aidjnx8j3e89oddd2ne8',
    title: 'Project 1',
    description: 'This is project 1',
    icon: (
      <span className='relative flex h-3 w-3'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
      </span>
    ),
    services: [
      {
        id: 'asnsivicjrdj9393',
        name: 'pin-hcms',
        description: 'this is pin-hcms description',
        icon: <Box className='h-8 w-8 text-slate-500 dark:text-slate-400' />,
        updatedAt: '12-03-2000',
        status: 'active',
        deployments: [
          {
            id: 'maskcisciwe34r9i',
            status: 'CRASHED',
            updatedAt: '12-3-333',
            meta: {
              // branch: 'main',
              commitMessage: 'Chore: Updating ui for dashboard',
              image: 'docker',
            },
          },
          {
            id: 'maskcisciwe34r9',
            status: 'REMOVED',
            updatedAt: '12-3-333',
            meta: {
              branch: 'main',
              commitMessage: 'Chore: Updating ui for dashboard',
              // image: 'docker',
            },
          },
        ],
      },
      {
        id: 'cskjuhwhw98ujdsjjcdsl3',
        name: 'mongodb',
        description: 'this is mongodb description',
        icon: <Leaf className='h-8 w-8 text-slate-500 dark:text-slate-400' />,
        updatedAt: '12-03-2000',
        status: 'sleep',
      },
    ],
  },
  {
    id: 'xndwejn84ow9udcdiojw',
    title: 'Project 2',
    description: 'This is project 2',
    icon: (
      <span className='relative flex h-3 w-3'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
      </span>
    ),
    services: [
      {
        id: 'asnsivicjrdj9393',
        name: 'pin-hcms',
        description: 'this is pin-hcms description',
        icon: (
          <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        ),
        updatedAt: '12-03-2000',
        status: 'active',
      },
      {
        id: 'cskjuhwhw98ujdsjjcdsl3',
        name: 'mongodb',
        description: 'this is mongodb description',
        icon: (
          <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        ),
        updatedAt: '12-03-2000',
        status: 'sleep',
      },
    ],
  },
  {
    id: 'fxtf7u8u9kokokoi97t7gfh',
    title: 'Project 3',
    description: 'This is project 3',
    icon: (
      <span className='relative flex h-3 w-3'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
      </span>
    ),
    services: [
      {
        id: 'asnsivicjrdj9393',
        name: 'pin-hcms',
        description: 'this is pin-hcms description',
        icon: (
          <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        ),
        updatedAt: '12-03-2000',
        status: 'active',
      },
      {
        id: 'cskjuhwhw98ujdsjjcdsl3',
        name: 'mongodb',
        description: 'this is mongodb description',
        icon: (
          <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        ),
        updatedAt: '12-03-2000',
        status: 'sleep',
      },
    ],
  },
  {
    id: 'ygfygyvghgtftgf6655768jii',
    title: 'Project 4',
    description: 'This is project 4',
    icon: (
      <span className='relative flex h-3 w-3'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-3 w-3 bg-yellow-500'></span>
      </span>
    ),
    services: [
      {
        id: 'asnsivicjrdj9393',
        name: 'pin-hcms',
        description: 'this is pin-hcms description',
        icon: (
          <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        ),
        updatedAt: '12-03-2000',
        status: 'active',
      },
      {
        id: 'cskjuhwhw98ujdsjjcdsl3',
        name: 'mongodb',
        description: 'this is mongodb description',
        icon: (
          <DollarSignIcon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        ),
        updatedAt: '12-03-2000',
        status: 'sleep',
      },
    ],
  },
]
