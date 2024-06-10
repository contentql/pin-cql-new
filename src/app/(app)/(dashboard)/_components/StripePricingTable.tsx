'use client'

import { env } from '@env'

import { trpc } from '~/src/trpc/client'

const StripePricingTable = () => {
  const { data: customerSession } = trpc.stripe.createCustomerSession.useQuery()
  const { data: productData } = trpc.stripe.retrieveProduct.useQuery()

  return (
    <div>
      <stripe-pricing-table
        pricing-table-id={env.NEXT_PUBLIC_PRICING_TABLE_ID}
        publishable-key={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        customer-session-client-secret={customerSession?.client_secret}
      />
    </div>
  )
}

export default StripePricingTable
