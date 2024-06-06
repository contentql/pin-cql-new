import StripePricingTable from '@/app/(app)/(dashboard)/_components/StripePricingTable'

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
        <StripePricingTable />
      </div>
    </section>
  )
}

export default Pricing
