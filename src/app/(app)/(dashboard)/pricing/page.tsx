import * as React from 'react'

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
  return (
    <section className='bg-white pt-10 lg:pt-[40px] relative z-20 overflow-hidden '>
      <div className='container'>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full px-4'>
            <div className='text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]'>
              <span className='font-semibold text-lg text-primary mb-2 block'>
                Pricing Table
              </span>
              <h2
                className='
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  '>
                Our Pricing Plan
              </h2>
              <p className='text-base text-body-color'>
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
          />
        </div>
      </div>
    </section>
  )
}

export default Pricing
