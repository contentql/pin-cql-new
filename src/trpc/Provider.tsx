'use client'

import { ApolloProvider } from '@apollo/client'
import { env } from '@env'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import client from '../lib/apollo/apolloClient'

import { trpc } from '@/trpc/client'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_PUBLIC_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/trpc`,
        }),
      ],
    }),
  )
  return (
    <ApolloProvider client={client}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
    </ApolloProvider>
  )
}
