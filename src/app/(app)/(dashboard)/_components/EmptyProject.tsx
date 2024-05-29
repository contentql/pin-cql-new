'use client'

import { BackgroundBeams } from '@/components/ui/background-beams'
import { Button } from '@/components/ui/button'

export function EmptyProject({setIsDialogOpen }: { setIsDialogOpen: (arg: boolean) => void }) {
  return (
    <div className='h-[30rem] w-full rounded-md bg-white relative flex flex-col items-center justify-center antialiased mx-auto'>
      <div className='flex flex-col justify-center max-w-xl mx-auto p-4'>
        <h1 className='relative z-10 pb-2 text-lg md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-950  text-center font-sans font-bold'>
          No Projects Created
        </h1>
        <div className='mx-auto mt-6 z-10'>
          <Button onClick={() => {
            setIsDialogOpen(true)
            console.log('clicked')
          }}>Create Now</Button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  )
}
