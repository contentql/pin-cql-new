import { router, userProcedure } from '@/trpc'
import fetchData from '@/utils/fetchData'

export const SLUG = 'contentql'
export const TEAM_ID = 'team_Re3abfSSQoB8ELNOrc95I4DY'

export const vercelRouter = router({
  // Get all projects
  getProjects: userProcedure.query(async ({}) => {
    try {
      const response = await fetchData(
        `/v9/projects?slug=${SLUG}&teamId=${TEAM_ID}`,
        {},
        'get all projects',
      )

      return response.data
    } catch (error) {
      console.error('Error during getting projects:', error)
      throw new Error('Error during getting projects')
    }
  }),
})
