import { Box, DollarSignIcon, Leaf } from 'lucide-react'

export const projects = [
  {
    id: 'aidjnx8j3e89oddd2ne8',
    title: 'Project 1',
    description: 'This is project 1',
    status: 'Active',
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
        variables: {
          AUTH_GITHUB_ID: 'Ov23licFp2QOb6xaJUDE',
          AUTH_GITHUB_SECRET: '4d7351d2e54a408c1bca99f2183417c8a27f01f7',
          AUTH_SECRET: 'jawliejfilwajefSEANlawefawfewag349jwgo3gj4w',
          AUTH_TRUST_HOST: 'true',
          AUTH_URL: 'https://pin-hcms-production-29b4.up.railway.app',
          AUTH_VERPOSE: 'true',
          DATABASE_URI:
            'mongodb://mongo:zjHHtIpqDmNmMawQXqcRFCIdwyuCfjbS@monorail.proxy.rlwy.net:54757',
          NEXT_PRIVATE_DRAFT_SECRET: 'bEZFgfNekjlhdfexAZHYgvWLMAWOiDlt',
          NEXT_PRIVATE_REVALIDATION_KEY: 'ETlcTeSVPPdXRqGdDcVHStNxZbEgxOfa',
          NEXT_PUBLIC_IS_LIVE: 'true',
          NEXT_PUBLIC_PUBLIC_URL:
            'https://pin-hcms-production-29b4.up.railway.app',
          PAYLOAD_PUBLIC_DRAFT_SECRET: 'dFBLUcdUxqeYuzhmGgNsjnpOUhAuTdds',
          PAYLOAD_SECRET: 'QEAhkRbRZTTVlsCSdPLPHDsAkEXdCqAh',
          PAYLOAD_URL: 'https://pin-hcms-production-29b4.up.railway.app',
          RAILWAY_ENVIRONMENT: 'production',
          RAILWAY_ENVIRONMENT_ID: '4f31555e-b115-4857-a9b7-632d62627d12',
          RAILWAY_ENVIRONMENT_NAME: 'production',
          RAILWAY_PRIVATE_DOMAIN: 'pin-hcms.railway.internal',
          RAILWAY_PROJECT_ID: '186c0e90-5048-4ace-8f81-d9c0db5ccc8b',
          RAILWAY_PROJECT_NAME: 'vivacious-elegance',
          RAILWAY_PUBLIC_DOMAIN: 'pin-hcms-production-29b4.up.railway.app',
          RAILWAY_SERVICE_ID: '72b8db81-b27b-4a21-92d8-ad099d8b4170',
          RAILWAY_SERVICE_NAME: 'pin-hcms',
          RAILWAY_SERVICE_PIN_HCMS_URL:
            'pin-hcms-production-29b4.up.railway.app',
          RAILWAY_STATIC_URL: 'pin-hcms-production-29b4.up.railway.app',
          RESEND_API_KEY: 're_i4bXtBCr_G4LVrvVvYTmYVFcLRPhmW5AP',
          RESEND_SENDER_EMAIL: 'akhil@resonateaes.com',
          RESEND_SENDER_NAME: 'Akhil',
          REVALIDATION_KEY: 'tuxRnnOwtoHYEnijoFWGRujiTHfTGNtU',
          S3_ACCESS_KEY_ID: 'a6e207ded76b2863bf8d881c8b3ec881',
          S3_BUCKET: 'pin-hcms',
          S3_ENDPOINT:
            'https://649f07b28a7583914dfd1580a91610df.r2.cloudflarestorage.com/pin-hcms',
          S3_REGION: 'us-east-1',
          S3_SECRET_ACCESS_KEY:
            '08293b8176f1a15e3cbebc823ec7cc238ce1714ccb67df0333215e8b64b19103',
        },
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
    id: 'fxtf7u8u9kokokoi97t7gfh',
    title: 'Project 3',
    description: 'This is project 3',
    status: 'Failed',
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
    status: 'Deploying',
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
