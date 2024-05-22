import client from '@/lib/apollo/apolloClient'
import { GET_PROJECTS, GET_TEMPLATE_DETAILS } from '@/lib/apollo/railwayQuery'
import { getDetailsSchema } from '@/lib/apollo/railwayTypes'
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
})
