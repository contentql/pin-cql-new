import { env } from '@env'

import { router, userProcedure } from '@/trpc'

const stripeSDK = require('stripe')(env.STRIPE_SECRET_KEY)

export const stripe = router({
  createCustomerPortalSession: userProcedure.mutation(async () => {
    try {
      const session = await stripeSDK.billingPortal.sessions.create({
        customer: 'cus_QEi9xmIlUc6u5d',
        return_url: 'http://localhost:3000/dashboard',
      })

      return session
    } catch (error) {
      console.log(error)
      throw new Error('Unable to create customer portal session.')
    }
  }),

  createCustomer: userProcedure.mutation(async ({ ctx }) => {
    try {
      const { user } = ctx

      const customer = await stripeSDK.customers.create({
        name: user.name,
        email: user.email,
      })

      console.log(customer)

      return customer
    } catch (error) {
      console.log(error)
      throw new Error('Unable to create a stripe customer')
    }
  }),
})
