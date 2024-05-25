import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { router, userProcedure } from '@/trpc'

const projectsSchema = z.object({
  name: z.string(),
  projectId: z.string(), // Assuming projectId is a UUID
  workflowId: z.string(),
})

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

  createProject: userProcedure
    .input(projectsSchema)
    .mutation(async ({ ctx, input }) => {
      console.log('input', input)
      const { user } = ctx
      try {
        await payload.create({
          collection: 'projects',
          data: {
            projects: [input],
          },
          user,
        })
        return { success: true }
      } catch (error) {
        console.log('Error during creating project:', error)
        throw new Error('Error during creating project')
      }
    }),
})
