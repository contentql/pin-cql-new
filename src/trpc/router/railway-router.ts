import client from '@/lib/apollo/apolloClient'
import {
  GET_PROJECTS,
  GET_TEMPLATE_DETAILS,
  TEMPLATE_DELETE_MUTATION,
  TEMPLATE_DEPLOY_MUTATION,
  TEMPLATE_REDEPLOY_MUTATION,
  TEMPLATE_UPDATE_MUTATION,
} from '@/lib/apollo/railwayQuery'
import {
  getDetailsSchema,
  templateCreate,
  templateDelete,
  templateReDeploy,
  templateUpdate,
} from '@/lib/apollo/railwayTypes'
import { publicProcedure, router } from '@/trpc'

export const railwayRouter = router({
  // Get all projects
  getProjects: publicProcedure.query(async ({}) => {
    try {
      // Fetch data using Apollo Client
      const { data } = await client.query({
        query: GET_PROJECTS,
      })

      // Return the data
      return data
    } catch (error) {
      console.error('Error during getting projects:', error)
      throw new Error('Error during getting projects')
    }
  }),

  // Get details of a specific template
  getDetails: publicProcedure
    .input(getDetailsSchema)
    .mutation(async ({ input, ctx }) => {
      const { id } = input
      console.log('input:', input)
      try {
        const { data } = await client.mutate({
          mutation: GET_TEMPLATE_DETAILS,
          variables: { id },
        })
        return data
      } catch (error) {
        console.error('Error during getting template details:', error)
        throw new Error('Error during getting template details')
      }
    }),

  // Create a new template
  templateCreate: publicProcedure
    .input(templateCreate)
    .mutation(async ({ input: requestData }) => {
      const { input } = requestData
      try {
        // Mutate data using Apollo Client with variables
        const { data } = await client.mutate({
          mutation: TEMPLATE_DEPLOY_MUTATION,
          variables: { input },
        })

        return data
      } catch (error) {
        console.error('Error during template deployment:', error)
        throw new Error('Error during template deployment')
      }
    }),

  // Delete a template
  templateDelete: publicProcedure
    .input(templateDelete)
    .mutation(async ({ input }) => {
      const { id } = input
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_DELETE_MUTATION,
          variables: { id },
        })

        return data
      } catch (error) {
        console.error('Error during template deletion:', error)

        throw new Error('Error during template deletion')
      }
    }),

  // Update a template
  templateUpdate: publicProcedure
    .input(templateUpdate)
    .mutation(async ({ input: requestData }) => {
      const { input } = requestData
      console.log('requestData', requestData)
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_UPDATE_MUTATION,
          variables: { input },
        })

        return data
      } catch (error) {
        console.error('Error during template updating:', error)

        throw new Error('Error during template update')
      }
    }),

  // Re-deploy a template
  templateReDeploy: publicProcedure
    .input(templateReDeploy)
    .mutation(async ({ input }) => {
      const { environmentId, serviceId } = input
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_REDEPLOY_MUTATION,
          variables: { environmentId, serviceId },
        })
        return data
      } catch (error) {
        console.error('Error during template re-deployment:', error)
        throw new Error('Error during template re-deployment')
      }
    }),
})
