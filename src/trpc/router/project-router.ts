import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { router, userProcedure } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})

export const projectRouter = router({
  getProjects: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx
    try {
      const projects = await payload.find({
        collection: 'projects',
        user,
      })

      return projects
    } catch (error) {
      console.error('Error during getting projects:', error)
      throw new Error('Error during getting projects')
    }
  }),
})
