import client from '@/lib/apollo/apolloClient'
import {
  GET_PROJECTS,
  GET_TEMPLATE_DETAILS,
  TEMPLATE_DELETE_MUTATION,
  TEMPLATE_DEPLOY_MUTATION,
} from '@/lib/apollo/railwayQuery'
import {
  getDetailsSchema,
  templateCreate,
  templateDelete,
} from '@/lib/apollo/railwayTypes'
import { publicProcedure, router } from '@/trpc'

export const railwayRouter = router({
  getProjects: publicProcedure.query(async ({}) => {
    try {
      const { data } = await client.query({
        query: GET_PROJECTS,
      })

      //   return new Response(JSON.stringify(data), {
      //     status: 200,
      //     headers: { 'Content-Type': 'application/json' },
      //   })
      return data
    } catch (error) {
      console.error('Error during getting projects:', error)
      throw new Error('Error during getting projects')
    }
  }),

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
        // return new Response(JSON.stringify(data), {
        //   status: 200,
        //   headers: { 'Content-Type': 'application/json' },
        // })
      } catch (error) {
        console.error('Error during getting template details:', error)
        throw new Error('Error during getting template details')
      }
    }),

  templateCreate: publicProcedure
    .input(templateCreate)
    .mutation(async ({ input }) => {
      //   const { input: requestData } = input
      console.log('requestData', input)
      try {
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
})
