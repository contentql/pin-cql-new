import { env } from '@env'
import {
  adjectives,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator'

import { router, userProcedure } from '@/trpc'
import {
  CreateNewDeploymentByProjectNameSchema,
  CreateProjectWithGithubRepoSchema2,
  CreateWebhookByProjectIdSchema,
  DeleteEnvVarByIdAndProjectNameOrIdSchema,
  EditEnvVarByIdAndProjectNameOrIdSchema,
  GetEnvVarsByProjectNameOrIdSchema,
  GetProjectByNameOrIdSchema,
  UpdateProjectByNameOrIdSchema,
  deleteProjectNameOrIdSchema,
  upsertEnvVarsByProjectNameOrIdSchema,
} from '@/trpc/validators/vercel'
import { vercelAPI } from '@/utils/vercelAPI'

export const SLUG = 'contentql'
export const TEAM_ID = 'team_Re3abfSSQoB8ELNOrc95I4DY'

export const vercelRouter = router({
  // Get all projects
  getProjects: userProcedure.query(async ({}) => {
    try {
      const response = await vercelAPI(
        `/v9/projects?slug=${SLUG}&teamId=${TEAM_ID}`,
        { method: 'GET' },
        'getting projects',
      )

      return response.data
    } catch (error) {
      throw new Error('Error during getting projects')
    }
  }),

  // Get a project by name or id
  getProjectByNameOrId: userProcedure
    .input(GetProjectByNameOrIdSchema)
    .query(async ({ input }) => {
      const { projectNameOrId } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'GET' },
          'getting a project details',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during getting a project details')
      }
    }),

  // Get a project by name or id
  deleteProjectNameOrId: userProcedure
    .input(deleteProjectNameOrIdSchema)
    .mutation(async ({ input }) => {
      const { projectNameOrId } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'DELETE' },
          'deleting a project',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during deleting a project')
      }
    }),

  // Create a new project with a github repo
  createProjectWithGithubRepo: userProcedure
    .input(CreateProjectWithGithubRepoSchema2)
    .mutation(async ({ input }) => {
      const serviceVariable = input?.data!

      const randomName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
      })

      const updatedProjectName = `${serviceVariable?.Project_Name}_${randomName}`

      try {
        const response = await vercelAPI(
          `/v10/projects?slug=${SLUG}&teamId=${TEAM_ID}`,
          {
            method: 'POST',
            data: {
              name: updatedProjectName,
              buildCommand: null,
              devCommand: null,
              serverlessFunctionRegion: 'bom1',
              environmentVariables: [
                {
                  key: 'CI',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: 'true',
                },
                {
                  key: 'DATABASE_URI',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable?.DATABASE_URI || env.DATABASE_URI,
                },
                {
                  key: 'PAYLOAD_SECRET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: '{{randomString}}',
                },
                {
                  key: 'NEXT_PUBLIC_PUBLIC_URL',
                  target: ['development', 'preview', 'production'],
                  type: 'system',
                  value: 'VERCEL_URL',
                },
                {
                  key: 'PAYLOAD_URL',
                  target: ['development', 'preview', 'production'],
                  type: 'system',
                  value: 'VERCEL_URL',
                },
                {
                  key: 'S3_ENDPOINT',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable.S3_ENDPOINT || env.S3_ENDPOINT,
                },
                {
                  key: 'S3_ACCESS_KEY_ID',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value:
                    serviceVariable.S3_ACCESS_KEY_ID || env.S3_ACCESS_KEY_ID,
                },
                {
                  key: 'S3_SECRET_ACCESS_KEY',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value:
                    serviceVariable.S3_SECRET_ACCESS_KEY ||
                    env.S3_SECRET_ACCESS_KEY,
                },
                {
                  key: 'S3_BUCKET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable.S3_BUCKET || env.S3_BUCKET,
                },
                {
                  key: 'S3_REGION',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable.S3_REGION || env.S3_REGION,
                },
                {
                  key: 'RESEND_API_KEY',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable.RESEND_API_KEY || env.RESEND_API_KEY,
                },
                {
                  key: 'RESEND_SENDER_EMAIL',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value:
                    serviceVariable.RESEND_SENDER_EMAIL ||
                    env.RESEND_SENDER_EMAIL,
                },
                {
                  key: 'RESEND_SENDER_NAME',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value:
                    serviceVariable.RESEND_SENDER_NAME ||
                    env.RESEND_SENDER_NAME,
                },
                {
                  key: 'NEXT_PUBLIC_IS_LIVE',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: 'false',
                },
                {
                  key: 'PAYLOAD_PUBLIC_DRAFT_SECRET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: '{{randomString}}',
                },
                {
                  key: 'NEXT_PRIVATE_DRAFT_SECRET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: '{{randomString}}',
                },
                {
                  key: 'REVALIDATION_KEY',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: '{{randomString}}',
                },
                {
                  key: 'NEXT_PRIVATE_REVALIDATION_KEY',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: '{{randomString}}',
                },
                {
                  key: 'NEXT_PUBLIC_HASURA_BASE_URL',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: env.NEXT_PUBLIC_HASURA_URI,
                },
                {
                  key: 'NEXT_PUBLIC_HASURA_ADMIN_SECRET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: env.HASURA_API_KEY,
                },
                {
                  key: 'NEXT_PUBLIC_RAILWAY_API_TOKEN',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: env.RAILWAY_SUPER_API,
                },
                {
                  key: 'AUTH_SECRET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: env.AUTH_SECRET,
                },
                {
                  key: 'AUTH_TRUST_HOST',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: 'true',
                },
                {
                  key: 'AUTH_VERPOSE',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: 'true',
                },
                {
                  key: 'AUTH_URL',
                  target: ['development', 'preview', 'production'],
                  type: 'system',
                  value: 'VERCEL_URL',
                },
                {
                  key: 'AUTH_GITHUB_ID',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable.AUTH_GITHUB_ID || env.AUTH_GITHUB_ID,
                },
                {
                  key: 'AUTH_GITHUB_SECRET',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value:
                    serviceVariable.AUTH_GITHUB_SECRET ||
                    env.AUTH_GITHUB_SECRET,
                },
                {
                  key: 'OPENAPI_KEY',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: serviceVariable.OPENAPI_KEY || env.OPENAPI_KEY,
                },
                {
                  key: 'SUBSCRIPTION_PLAN',
                  target: ['development', 'preview', 'production'],
                  type: 'encrypted',
                  value: 'creator',
                },
              ],
              framework: 'nextjs',
              gitRepository: {
                repo: 'contentql/pin-hcms',
                type: 'github',
              },
              installCommand: null,
              outputDirectory: null,
              rootDirectory: null,
            },
          },
          'creating a project',
        )

        return response.data
      } catch (error: any) {
        console.log(error)
        throw new Error('Error during creating project', error)
      }
    }),

  // Create a webhook by project id
  createWebhookByProjectId: userProcedure
    .input(CreateWebhookByProjectIdSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await vercelAPI(
          `/v1/webhooks?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'POST', data: { ...input } },
          'creating a webhook for the project',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during creating a webhook for the project')
      }
    }),

  // Create a new deployment for a project
  createNewDeploymentByProjectName: userProcedure
    .input(CreateNewDeploymentByProjectNameSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await vercelAPI(
          `/v13/deployments?forceNew=0&skipAutoDetectionConfirmation=1&slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'POST', data: { ...input } },
          'creating a new deployment for the project',
        )

        return response.data
      } catch (error) {
        throw new Error(
          'Error during creating a new deployment for the project',
        )
      }
    }),

  // Upsert one or more environment variables
  upsertEnvVarsByProjectNameOrId: userProcedure
    .input(upsertEnvVarsByProjectNameOrIdSchema)
    .query(async ({ input }) => {
      const { projectNameOrId, ...body } = input

      try {
        const response = await vercelAPI(
          `/v10/projects/${projectNameOrId}/env?slug=${SLUG}&teamId=${TEAM_ID}&upsert=true`,
          { method: 'POST', data: { ...body } },
          'upsert environment variables',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during upsert environment variables')
      }
    }),

  // Get environment variables by project name or id
  GetEnvVarsByProjectNameOrId: userProcedure
    .input(GetEnvVarsByProjectNameOrIdSchema)
    .query(async ({ input }) => {
      const { projectNameOrId } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}/env?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'GET' },
          'getting environment variables',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during getting environment variables')
      }
    }),

  // Edit a environment variable by id and project name or id
  EditEnvVarByIdAndProjectNameOrId: userProcedure
    .input(EditEnvVarByIdAndProjectNameOrIdSchema)
    .query(async ({ input }) => {
      const { envVarId, projectNameOrId, ...body } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}/env/${envVarId}?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'PATCH', data: { ...body } },
          'editing environment variable',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during editing environment variable')
      }
    }),

  // Delete a environment variable by id and project name and id
  DeleteEnvVarByIdAndProjectNameOrId: userProcedure
    .input(DeleteEnvVarByIdAndProjectNameOrIdSchema)
    .query(async ({ input }) => {
      const { envVarId, projectNameOrId } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}/env/${envVarId}?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'DELETE' },
          'deleting environment variable',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during deleting environment variable')
      }
    }),

  // Update a project using name or id
  UpdateProjectByNameOrId: userProcedure
    .input(UpdateProjectByNameOrIdSchema)
    .query(async ({ input }) => {
      const { projectNameOrId, ...body } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}??slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'PATCH', data: { ...body } },
          'updating project',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during updating project')
      }
    }),
})
