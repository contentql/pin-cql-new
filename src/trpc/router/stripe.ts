import { env } from '@env'
import Stripe from 'stripe'

import { router, userProcedure } from '@/trpc'

const stripeSDK = new Stripe(env.STRIPE_SECRET_KEY)

export const stripe = router({
  createCustomerPortalSession: userProcedure.mutation(
    async ({ ctx: { user } }) => {
      try {
        const session = await stripeSDK.billingPortal.sessions.create({
          customer: user.stripeCID as string,
          return_url: env.PAYLOAD_URL,
        })

        return session
      } catch (error) {
        console.log(error)
        throw new Error('Unable to create customer portal session.')
      }
    },
  ),

  createCustomerSession: userProcedure.query(async ({ ctx: { user } }) => {
    try {
      const customerSession = await stripeSDK.customerSessions.create({
        customer: user.stripeCID as string,
        components: {
          pricing_table: {
            enabled: true,
          },
        },
      })
      return customerSession
    } catch (error) {
      console.log(error)
      throw new Error('error creating customer session')
    }
  }),

  retrieveProduct: userProcedure.query(async ({}) => {
    try {
      const productData = await stripeSDK.products.retrieve(
        'prod_QF1w8UjVJUqaEQ',
      )
      return productData
    } catch (error) {
      console.log(error)
      throw new Error('error while getting product stripe data')
    }
  }),
})
