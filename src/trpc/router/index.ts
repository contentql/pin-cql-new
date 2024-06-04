import { publicProcedure, router } from '@/trpc'
import { getBlogs } from '@/trpc/router/blog-router'
import { getLayouts } from '@/trpc/router/page-router'
import { projectRouter } from '@/trpc/router/project-router'
import { railwayRouter } from '@/trpc/router/railway-router'
import { todoRouter } from '@/trpc/router/todo'
import { userRouter } from '@/trpc/router/user-router'

export const appRouter = router({
  todo: todoRouter,
  page: getLayouts,
  blog: getBlogs,
  railway: railwayRouter,
  projects: projectRouter,
  user: userRouter,
  test: publicProcedure.query(async () => {
    return {
      success: 'working',
    }
  }),
})

export type AppRouter = typeof appRouter
