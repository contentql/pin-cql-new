'use client'

import { Button } from '@/components/ui/button'

export function EmptyProject({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (arg: boolean) => void
}) {
  return (
    <div className='relative z-10 mx-auto flex h-[30rem] w-full flex-col items-center justify-center rounded-md antialiased'>
      <div className='mx-auto flex max-w-xl flex-col justify-center p-4'>
        <h1 className='relative z-10 bg-gradient-to-b from-neutral-600 to-neutral-950  bg-clip-text pb-2 text-center font-sans text-lg  font-bold text-transparent md:text-6xl'>
          No Projects Created
        </h1>
        <div className='z-10 mx-auto mt-6'>
          <Button
            onClick={() => {
              setIsDialogOpen(true)
              console.log('clicked')
            }}>
            Create Now
          </Button>
        </div>
      </div>
    </div>
  )
}
