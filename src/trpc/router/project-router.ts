import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { router, userProcedure } from '@/trpc'

// import { encrypt } from '@/utils/crypto'

const projectsSchema = z.object({
  name: z.string(),
  projectId: z.string(), // Assuming projectId is a UUID
  workflowId: z.string(),
  isNewProject: z.boolean(),
})

const deleteProjectSchema = z.object({
  id: z.string(),
})

const updateProjectNameSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const updateProjectEnvVariables = z.object({
  key: z.string(),
  id: z.string(),
  value: z.any(),
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
        overrideAccess: false,
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
      const { user } = ctx
      try {
        const { id, name, projectId } = await payload.create({
          collection: 'projects',
          data: {
            name: input.name,
            projectId: input.projectId,
            workflowId: input.workflowId,
            isNewProject: input.isNewProject,
          },
          user,
        })
        return { id, name, projectId }
      } catch (error) {
        console.log('Error during creating project:', error)
        throw new Error('Error during creating project')
      }
    }),

  updateProjectEnvVariables: userProcedure
    .input(updateProjectEnvVariables)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx

      // const encryptedValue = encrypt(input.value)

      console.log({ input })

      try {
        await payload.update({
          collection: 'projects',
          where: {
            name: {
              equals: input.id,
            },
          },
          data: {
            userEnvironmentVariables: [
              {
                variableName: input.key,
                value: input.value,
              },
            ],
          },
        })
      } catch (error) {
        console.log(error)
      }
    }),

  updateProjectEvents: userProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      try {
        await payload.update({
          collection: 'projects',
          data: {
            deploymentEventMessages: input.data,
          },
          where: {},
        })
      } catch (error) {
        console.error('Error updating project events', error)
      }
    }),

  updateProjectName: userProcedure
    .input(updateProjectNameSchema)
    .mutation(async ({ input }) => {
      try {
        await payload.update({
          collection: 'projects',
          id: input.id,
          data: {
            name: input.name,
          },
        })
      } catch (error) {
        console.log('Error during updating project:', error)
      }
    }),

  deleteProject: userProcedure
    .input(deleteProjectSchema)
    .mutation(async ({ input }) => {
      try {
        await payload.delete({
          collection: 'projects',
          id: input.id,
        })
      } catch (error) {
        console.log('Error during deleting project:', error)
        throw new Error('Error during deleting project')
      }
    }),
})
