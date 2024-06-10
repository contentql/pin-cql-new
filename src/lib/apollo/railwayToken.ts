'use server'

import { auth } from '@/lib/auth'

// import { trpc } from '@/trpc/client'

export const getRailwayApiToken = async () => {
  const session = await auth()
  const user = session?.user
  console.log('user', user?.railwayApiToken)
  return user?.railwayApiToken
}
