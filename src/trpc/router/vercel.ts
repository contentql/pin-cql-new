import { router, userProcedure } from '@/trpc'
import {
  CreateNewDeploymentByProjectNameSchema,
  CreateProjectWithGithubRepoSchema,
  CreateWebhookByProjectIdSchema,
  GetProjectByNameOrIdSchema,
  UpsertEnvironmentVariablesSchema,
  deleteProjectNameOrIdSchema,
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
    .query(async ({ input }) => {
      const { projectNameOrId } = input

      try {
        const response = await vercelAPI(
          `/v9/projects/${projectNameOrId}?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'GET' },
          'deleting a project',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during deleting a project')
      }
    }),

  // Create a new project with a github repo
  createProjectWithGithubRepo: userProcedure
    .input(CreateProjectWithGithubRepoSchema)
    .query(async ({ input }) => {
      try {
        const response = await vercelAPI(
          `/v10/projects?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'POST', data: { ...input } },
          'creating a project',
        )

        return response.data
      } catch (error) {
        throw new Error('Error during creating project')
      }
    }),

  // Create a webhook by project id
  createWebhookByProjectId: userProcedure
    .input(CreateWebhookByProjectIdSchema)
    .query(async ({ input }) => {
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
    .query(async ({ input }) => {
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
  upsertEnvironmentVariables: userProcedure
    .input(UpsertEnvironmentVariablesSchema)
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
})
