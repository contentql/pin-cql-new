'use client'

import * as React from 'react'

import { trpc } from '~/src/trpc/client'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

const Pricing = () => {
  const { data: customerSession } = trpc.stripe.createCustomerSession.useQuery()

  const { data: user } = trpc.user.getUser.useQuery()

  console.log(customerSession)
  return (
    <section className='relative z-20 overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]'>
      <div className='container'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20'>
              <span className='text-primary mb-2 block text-lg font-semibold'>
                Pricing Table
              </span>
              <h2 className='text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]'>
                Our Pricing Plan
              </h2>
              <p className='text-body-color text-base'>
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div>
          <stripe-pricing-table
            pricing-table-id='prctbl_1PL6daSANsDuJnVdAYvCMA5x'
            publishable-key='pk_test_51OgjvwSANsDuJnVdTJNvvmSw0yUXo5vRmV4CxvVAY1JJxpBOdUnZX5d9fuL3Pf6njHk0fKSX1ktOQH1VJClvyot200laA1Xndd'
            customer-session-client-secret={customerSession?.client_secret}
          />
        </div>
      </div>
    </section>
  )
}

export default Pricing
