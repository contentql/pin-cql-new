import { CollectionAfterChangeHook } from 'payload/types'

import { serverClient } from '@/trpc/serverClient'

export const createStripeCustomer: CollectionAfterChangeHook = async ({
  req,
  operation,
  doc,
}) => {
  if (operation === 'create') {
    const customer = await serverClient.stripe.createCustomer()

    console.log(customer)
  }
}
