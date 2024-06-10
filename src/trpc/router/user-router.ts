import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { router, userProcedure } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})

export const updateRailwayApiSchema = z.object({
  railwayApiKey: z.string(),
})

export const userRouter = router({
  // updateUserPlan: userProcedure.mutation(async ({ ctx, input }) => {
  //   const { user } = ctx
  //   const { plan: any } = input
  //   try {
  //     await payload.update({
  //       collection: 'users',
  //       id: user.id,
  //       data: {
  //         plan,
  //       },
  //     })
  //   } catch (error) {}
  // }),
  updateRailwayApi: userProcedure
    .input(updateRailwayApiSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx

      const { railwayApiKey } = input

      //   const encryptedApiKey = encrypt(railwayApiKey)
      try {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            railwayApiToken: railwayApiKey,
          },
        })
      } catch (error) {
        console.log('Error during updating project:', error)
      }
    }),

  getUser: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    try {
      const userData = await payload.findByID({
        collection: 'users',
        id: user.id,
      })
      return userData
    } catch (error) {
      console.log('Error during', error)
      return null
    }
  }),
})
