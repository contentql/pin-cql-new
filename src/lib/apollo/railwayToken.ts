'use server'

import { auth } from '@/lib/auth'

// import { trpc } from '@/trpc/client'

export const getRailwayApiToken = async () => {
  //   try {
  //     const { data } = trpc.user.getRailwayAPi.useQuery()
  //     console.log('ushg', data)
  //     return data?.railwayApiToken
  //   } catch (error) {
  //     console.error('Failed to fetch railwayApiToken:', error)
  //     return null
  //   }
  const session = await auth()
  const user = session?.user
  console.log('user', user?.railwayApiToken)
  return user?.railwayApiToken
}
