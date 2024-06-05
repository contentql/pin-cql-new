import { Skeleton } from '@/components/ui/skeleton'

export const LoadingSkeleton = () => {
  return (
    <div className='flex space-x-3'>
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
    </div>
  )
}
