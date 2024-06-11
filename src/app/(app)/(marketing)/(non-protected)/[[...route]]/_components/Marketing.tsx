'use client'

import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils'

export const siteConfig = {
  name: 'ContentQL',
  description:
    'An open source application built using the new router, server components and everything new in Next.js 13.',
  url: 'https://contentql.io',
  ogImage: 'https://contentql.io/favicon.ico',
  links: {
    linkedin: 'https://www.linkedin.com/company/analytica-enterprise-solutions',
    github: 'https://github.com/contentql/pin-hcms',
  },
}

const Marketing = () => {
  const features = [
    {
      id: 1,
      title: 'Rich Text Editor',
      description:
        'Write with ease using our intuitive rich text editor. Format your posts and other media.',
      icon: (
        <svg
          className='h-12 w-12 fill-current'
          viewBox='0 0 100 100'
          enable-background='new 0 0 100 100'>
          <path d='M22,71.8h56c1.1,0,2,0.9,2,2v4c0,1.1-0.9,2-2,2H22c-1.1,0-2-0.9-2-2v-4C20,72.7,20.9,71.8,22,71.8z' />
          <path d='M22,53.8h56c1.1,0,2,0.9,2,2v4c0,1.1-0.9,2-2,2H22c-1.1,0-2-0.9-2-2v-4C20,54.7,20.9,53.8,22,53.8z' />
          <path d='M57.6,35.8H78c1.1,0,2,0.9,2,2v4c0,1.1-0.9,2-2,2H57.6c-1.1,0-2-0.9-2-2v-4C55.6,36.7,56.5,35.8,57.6,35.8z' />
          <path d='M47.6,44.4L38.1,21c-0.2-0.4-0.6-0.7-1.1-0.7h-7.2c-0.4,0-0.9,0.3-1,0.7L20,44.4c-0.1,0.4,0.1,1,0.7,1h4.6  c0.4,0,0.9-0.4,1-0.8l1.8-5l11.1,0l2,5c0.1,0.4,0.6,0.8,1,0.8h4.6C47.4,45.4,47.7,44.9,47.6,44.4z M30.2,33.6l2.9-7.4h0.6l3.2,7.4  H30.2z' />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'SEO Optimization',
      description:
        ' Boost your blog’s search engine ranking with built-in SEO tools.',
      icon: (
        <svg viewBox='0 0 24 24' className='h-12 w-12 fill-current'>
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='M2.293,18.707a1,1,0,0,1,0-1.414l3-3a1,1,0,0,1,1.262-.125l2.318,1.545,2.42-2.42a1,1,0,0,1,1.414,1.414l-3,3a1,1,0,0,1-1.262.125L6.127,16.287l-2.42,2.42a1,1,0,0,1-1.414,0ZM22,3V21a1,1,0,0,1-1,1H3a1,1,0,0,1,0-2H20V8H4v4a1,1,0,0,1-2,0V3A1,1,0,0,1,3,2H21A1,1,0,0,1,22,3ZM4,6H20V4H4Zm10.707,6.707,1-1a1,1,0,0,0-1.414-1.414l-1,1a1,1,0,1,0,1.414,1.414Z'
          />{' '}
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Data Security',
      description:
        'We offer robust security measures to protect content and personal information.',
      icon: (
        <svg className='h-12 w-12 fill-current' viewBox='0 0 48 48'>
          <title>security-verified</title>
          <g id='Layer_2' data-name='Layer 2'>
            <g id='invisible_box' data-name='invisible box'>
              <rect width='48' height='48' fill='none' />
            </g>
            <g id='icons_Q2' data-name='icons Q2'>
              <path d='M24,6.2c5.3,1.5,11.1,3.3,14,4.3V26.2c0,3.4-3.7,9.4-14,15.4-10.3-6.1-14-12-14-15.4V10.5c2.9-1.1,8.7-2.8,14-4.3M24,2S6,7.1,6,8V26.2c0,9.2,13.3,17.3,17,19.5a1.8,1.8,0,0,0,2,0c3.8-2.1,17-10.3,17-19.5V8c0-.9-18-6-18-6Z' />
              <path d='M19.6,29.4l-5-4.9a2.1,2.1,0,0,1-.2-2.7,1.9,1.9,0,0,1,3-.2L21,25.2l9.6-9.6a2,2,0,0,1,2.8,2.8l-11,11A1.9,1.9,0,0,1,19.6,29.4Z' />
            </g>
          </g>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      description:
        'Track your blog’s performance with comprehensive analytics.',
      icon: (
        <svg viewBox='0 0 24 24' className='h-12 w-12 fill-current'>
          <g
            xmlns='http://www.w3.org/2000/svg'
            id='Analytics'
            stroke='none'
            stroke-width='1'
            fill='none'
            fill-rule='evenodd'
            stroke-dasharray='0,0'
            stroke-linecap='round'>
            <path
              d='M4,18.9999905 L7.75407946,11.491832 C7.8680565,11.2638231 8.06482016,11.0879651 8.30413884,11.0001847 C9.11356935,10.7032911 9.60000359,10.8000012 9.76344156,11.2903152 L11.1190224,15.3570574 C11.1996482,15.5988744 11.3695623,15.8007859 11.5940587,15.9215227 C12.3533352,16.3298705 12.8485386,16.3029137 13.079669,15.8406525 L18,5.99999082 M13,6.46409237 L17.2774408,5.31795559 C17.4347269,5.27579637 17.5999292,5.27269863 17.7586883,5.30891799 C18.3183612,5.43660193 18.6397719,5.65560146 18.7229204,5.96591657 L19.9282036,10.4640923'
              id='Vector'
              stroke='#030819'
              stroke-width='2'></path>
            <path
              xmlns='http://www.w3.org/2000/svg'
              d='M4,18.9999905 L7.75407946,11.491832 C7.8680565,11.2638231 8.06482016,11.0879651 8.30413884,11.0001847 C9.11356935,10.7032911 9.60000359,10.8000012 9.76344156,11.2903152 L11.1190224,15.3570574 C11.1996482,15.5988744 11.3695623,15.8007859 11.5940587,15.9215227 C12.3533352,16.3298705 12.8485386,16.3029137 13.079669,15.8406525 L18,5.99999082 M13,6.46409237 L17.2774408,5.31795559 C17.4347269,5.27579637 17.5999292,5.27269863 17.7586883,5.30891799 C18.3183612,5.43660193 18.6397719,5.65560146 18.7229204,5.96591657 L19.9282036,10.4640923'
              id='Vector'
              stroke='#030819'
              stroke-width='2'></path>
          </g>{' '}
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Interactive Comments',
      description:
        ' Encourage discussions and engage with readers through our comment system.',
      icon: (
        <svg viewBox='0 0 24 24' className='h-12 w-12 fill-current'>
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='M8.38204 10.234C7.96783 10.234 7.63204 10.5698 7.63204 10.984C7.63204 11.3982 7.96783 11.734 8.38204 11.734V10.234ZM14.147 11.734C14.5613 11.734 14.897 11.3982 14.897 10.984C14.897 10.5698 14.5613 10.234 14.147 10.234V11.734ZM9.10004 12.342C8.68583 12.342 8.35004 12.6778 8.35004 13.092C8.35004 13.5062 8.68583 13.842 9.10004 13.842V12.342ZM13.426 13.842C13.8403 13.842 14.176 13.5062 14.176 13.092C14.176 12.6778 13.8403 12.342 13.426 12.342V13.842ZM7.89534 6.77227C7.4868 6.84059 7.211 7.22716 7.27932 7.6357C7.34764 8.04424 7.73421 8.32005 8.14275 8.25173L7.89534 6.77227ZM8.51904 7.471L8.5175 8.221H8.51904V7.471ZM14.019 7.471L14.0247 6.721H14.019V7.471ZM17.035 10.532L16.285 10.5265V10.532H17.035ZM17.035 14.248L16.285 14.248L16.285 14.2489L17.035 14.248ZM16.2486 14.666C16.1762 15.0739 16.4482 15.4631 16.8561 15.5355C17.2639 15.6078 17.6532 15.3358 17.7255 14.928L16.2486 14.666ZM8.1494 8.25058C8.55731 8.17859 8.82962 7.78955 8.75763 7.38164C8.68563 6.97373 8.29659 6.70142 7.88869 6.77342L8.1494 8.25058ZM5.50004 10.531L6.25006 10.531L6.25003 10.527L5.50004 10.531ZM5.50004 19H4.75004C4.75004 19.2663 4.89121 19.5126 5.12096 19.6471C5.35071 19.7817 5.63459 19.7844 5.86683 19.6542L5.50004 19ZM8.51604 17.309V16.559C8.38759 16.559 8.2613 16.592 8.14926 16.6548L8.51604 17.309ZM14.016 17.309V18.059L14.021 18.059L14.016 17.309ZM17.7199 14.9289C17.7911 14.5209 17.518 14.1324 17.11 14.0612C16.7019 13.99 16.3134 14.263 16.2422 14.6711L17.7199 14.9289ZM7.28008 7.38379C7.20928 7.79191 7.48272 8.18016 7.89084 8.25096C8.29896 8.32177 8.6872 8.04832 8.75801 7.64021L7.28008 7.38379ZM10.987 5V4.24999L10.9827 4.25001L10.987 5ZM16.487 5L16.4934 4.25H16.487V5ZM19.5 8.061L18.75 8.05554V8.061H19.5ZM19.5 11.777H18.75L18.7501 11.782L19.5 11.777ZM16.8507 14.0614C16.4428 14.1334 16.1705 14.5224 16.2425 14.9304C16.3145 15.3383 16.7035 15.6106 17.1114 15.5386L16.8507 14.0614ZM8.38204 11.734H14.147V10.234H8.38204V11.734ZM9.10004 13.842H13.426V12.342H9.10004V13.842ZM8.14275 8.25173C8.26659 8.23102 8.39194 8.22074 8.5175 8.221L8.52059 6.721C8.31111 6.72057 8.10196 6.73772 7.89534 6.77227L8.14275 8.25173ZM8.51904 8.221H14.019V6.721H8.51904V8.221ZM14.0134 8.22098C15.2773 8.23051 16.2943 9.26265 16.2851 10.5265L17.785 10.5375C17.8002 8.4453 16.1168 6.7368 14.0247 6.72102L14.0134 8.22098ZM16.285 10.532V14.248H17.785V10.532H16.285ZM16.285 14.2489C16.2852 14.3887 16.273 14.5283 16.2486 14.666L17.7255 14.928C17.7654 14.7032 17.7853 14.4754 17.785 14.2471L16.285 14.2489ZM7.88869 6.77342C6.06575 7.09516 4.74009 8.68395 4.75006 10.535L6.25003 10.527C6.244 9.40676 7.04624 8.44529 8.1494 8.25058L7.88869 6.77342ZM4.75004 10.531V19H6.25004V10.531H4.75004ZM5.86683 19.6542L8.88283 17.9632L8.14926 16.6548L5.13326 18.3458L5.86683 19.6542ZM8.51604 18.059H14.016V16.559H8.51604V18.059ZM14.021 18.059C15.8485 18.047 17.4057 16.7293 17.7199 14.9289L16.2422 14.6711C16.0527 15.757 15.1134 16.5518 14.0111 16.559L14.021 18.059ZM8.75801 7.64021C8.94671 6.55256 9.88748 5.75633 10.9914 5.74999L10.9827 4.25001C9.15263 4.26052 7.59293 5.58059 7.28008 7.38379L8.75801 7.64021ZM10.987 5.75H16.487V4.25H10.987V5.75ZM16.4806 5.74997C17.7437 5.76075 18.7593 6.79252 18.7501 8.05554L20.25 8.06646C20.2652 5.97576 18.5841 4.26786 16.4934 4.25003L16.4806 5.74997ZM18.75 8.061V11.777H20.25V8.061H18.75ZM18.7501 11.782C18.7576 12.9034 17.955 13.8665 16.8507 14.0614L17.1114 15.5386C18.9362 15.2165 20.2624 13.6249 20.25 11.772L18.7501 11.782Z'
            fill='#000000'
          />{' '}
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Social Sharing',
      description:
        ' Expand your reach by sharing your posts on social media platforms with just a click.',
      icon: (
        <svg viewBox='0 0 24 24' className='h-12 w-12 fill-current'>
          <path
            xmlns='http://www.w3.org/2000/svg'
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M14 5C13.4477 5 13 5.44772 13 6C13 6.27642 13.1108 6.52505 13.2929 6.70711C13.475 6.88917 13.7236 7 14 7C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5ZM11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6C17 7.65685 15.6569 9 14 9C13.5372 9 13.0984 8.8948 12.7068 8.70744L10.7074 10.7068C10.8948 11.0984 11 11.5372 11 12C11 12.4628 10.8948 12.9016 10.7074 13.2932L12.7068 15.2926C13.0984 15.1052 13.5372 15 14 15C15.6569 15 17 16.3431 17 18C17 19.6569 15.6569 21 14 21C12.3431 21 11 19.6569 11 18C11 17.5372 11.1052 17.0984 11.2926 16.7068L9.29323 14.7074C8.90157 14.8948 8.46277 15 8 15C6.34315 15 5 13.6569 5 12C5 10.3431 6.34315 9 8 9C8.46277 9 8.90157 9.1052 9.29323 9.29256L11.2926 7.29323C11.1052 6.90157 11 6.46277 11 6ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.27642 13 8.52505 12.8892 8.70711 12.7071C8.88917 12.525 9 12.2764 9 12C9 11.7236 8.88917 11.475 8.70711 11.2929C8.52505 11.1108 8.27642 11 8 11ZM14 17C13.7236 17 13.475 17.1108 13.2929 17.2929C13.1108 17.475 13 17.7236 13 18C13 18.5523 13.4477 19 14 19C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17Z'
            fill='#000000'
          />{' '}
        </svg>
      ),
    },
  ]
  return (
    <>
      <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <Link
            href={siteConfig.links.linkedin}
            className='bg-muted rounded-2xl border px-4 py-1.5 text-sm font-medium'
            target='_blank'>
            Follow along on Linkedin
          </Link>
          <h1 className='font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Discover, Write, and Share Your Stories.
          </h1>
          <p className='text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8'>
            Explore a world of creativity and knowledge with ContentQL. Whether
            you&apos;re a seasoned writer or a new blogger, our platform is
            designed to help you share your thoughts, insights, and passions
            with a global audience.
          </p>
          <div className='space-x-4'>
            <Link
              href='/login'
              className='rounded bg-black px-6 py-3 text-white hover:bg-gray-700'>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
              )}>
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id='features'
        className='container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24'>
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Features
          </h2>
          <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'>
            Creating a successful blog application involves integrating a
            variety of features to enhance user experience, facilitate content
            management, and support community building.
          </p>
        </div>
        <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
          {features?.map(feature => {
            return (
              <div
                key={feature?.id}
                className='bg-background relative overflow-hidden rounded-lg border p-2'>
                <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                  {feature?.icon}
                  <div className='space-y-2'>
                    <h3 className='font-bold'>{feature?.title}</h3>
                    <p className='text-muted-foreground line-clamp-2 text-sm'>
                      {feature?.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='mx-auto text-center md:max-w-[58rem]'>
          <p className='text-muted-foreground leading-normal sm:text-lg sm:leading-7'>
            Above is a detailed description of key features typically included
            in a modern blog application.
          </p>
        </div>
      </section>
      <section id='open-source' className='container py-8 md:py-12 lg:py-24'>
        <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
          <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Join Our ContentQL Community Today!
          </h2>
          <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'>
            Unlock your creativity and share your stories with the world on our
            powerful blogging platform. Whether you&apos;re a seasoned writer or
            just starting, our intuitive tools and vibrant community make it
            easy to create, share, and grow your audience.{' '}
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className='underline underline-offset-4'>
              GitHub
            </Link>
            .{' '}
          </p>
          {true && (
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className='flex'>
              <div className='border-muted bg-muted flex h-10 w-10 items-center justify-center space-x-2 rounded-md border'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='text-foreground h-5 w-5'>
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'></path>
                </svg>
              </div>
              <div className='flex items-center'>
                <div className='border-muted h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-y-transparent'></div>
                <div className='border-muted bg-muted flex h-10 items-center rounded-md border px-4 font-medium'>
                  {/* {stars} */}
                  stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}

export default Marketing
