import { publicProcedure, router } from '@/trpc'
import { getBlogs } from '@/trpc/router/blog-router'
import { novuRouter } from '@/trpc/router/novu'
import { getLayouts } from '@/trpc/router/page-router'
import { projectRouter } from '@/trpc/router/project-router'
import { railwayRouter } from '@/trpc/router/railway-router'
import { stripe } from '@/trpc/router/stripe'
import { todoRouter } from '@/trpc/router/todo'
import { userRouter } from '@/trpc/router/user-router'
import { vercelRouter } from '@/trpc/router/vercel'

export const appRouter = router({
  todo: todoRouter,
  page: getLayouts,
  blog: getBlogs,
  railway: railwayRouter,
  vercel: vercelRouter,
  stripe: stripe,
  projects: projectRouter,
  user: userRouter,
  novu: novuRouter,
  test: publicProcedure.query(async () => {
    return {
      success: 'working',
    }
  }),
})

export type AppRouter = typeof appRouter
