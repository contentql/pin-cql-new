import { router, userProcedure } from '@/trpc'
import {
  createProjectWithGithubRepoSchema,
  createWebhookByProjectIdSchema,
  getProjectByNameOrIdSchema,
} from '@/trpc/validators/vercel'
import fetchData from '@/utils/fetchData'

export const SLUG = 'contentql'
export const TEAM_ID = 'team_Re3abfSSQoB8ELNOrc95I4DY'

export const vercelRouter = router({
  // Get all projects
  getProjects: userProcedure.query(async ({}) => {
    try {
      const response = await fetchData(
        `/v9/projects?slug=${SLUG}&teamId=${TEAM_ID}`,
        { method: 'GET' },
        'fetching projects',
      )

      return response.data
    } catch (error) {
      console.error('Error during getting projects:', error)
      throw new Error('Error during getting projects')
    }
  }),

  // Get a project by name or id
  getProjectByNameOrId: userProcedure
    .input(getProjectByNameOrIdSchema)
    .query(async ({ input }) => {
      const { nameOrId } = input

      try {
        const response = await fetchData(
          `/v9/projects/${nameOrId}?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'GET' },
          'fetching a project by name',
        )

        return response.data
      } catch (error) {
        console.error('Error during getting project details:', error)
        throw new Error('Error during getting project details')
      }
    }),

  // Create a new project with a github repo
  createProjectWithGithubRepo: userProcedure
    .input(createProjectWithGithubRepoSchema)
    .query(async ({ input }) => {
      try {
        const response = await fetchData(
          `/v10/projects?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'POST', data: { ...input } },
          'creating a project',
        )

        return response.data
      } catch (error) {
        console.error('Error during creating project:', error)
        throw new Error('Error during creating project')
      }
    }),

  // Create a webhook by project id
  createWebhookByProjectId: userProcedure
    .input(createWebhookByProjectIdSchema)
    .query(async ({ input }) => {
      try {
        const response = await fetchData(
          `/v1/webhooks?slug=${SLUG}&teamId=${TEAM_ID}`,
          { method: 'POST', data: { ...input } },
          'creating a webhook for the project',
        )

        return response.data
      } catch (error) {
        console.error('Error during creating a webhook for the project:', error)
        throw new Error('Error during creating a webhook for the project')
      }
    }),
})
