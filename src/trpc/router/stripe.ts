import { router, userProcedure } from '@/trpc'

export const stripe = router({
  createCustomerPortalSession: userProcedure.mutation(async () => {
    try {
      const stripe = require('stripe')(
        'sk_test_51OgjvwSANsDuJnVdSSlbKwfHSIeTT6yFkj9bsO96C5Seeyyey3DE8O30UTw5mGFZ2R8ja14HmWfrgkPnoZhgcZd3000tqZxLUr',
      )

      const session = await stripe.billingPortal.sessions.create({
        customer: 'cus_QEi9xmIlUc6u5d',
        return_url: 'http://localhost:3000/dashboard',
      })

      return session
    } catch (e) {
      console.log('Error: ', e)
      throw new Error('Unable to create customer portal session.')
    }
  }),
})
