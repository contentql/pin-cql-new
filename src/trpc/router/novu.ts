import { publicProcedure, router } from '@/trpc'
import { TriggerNotificationSchema } from '@/trpc/validators/novu'
import { sendNotification } from '@/utils/novu'

export const novuRouter = router({
  triggerNotification: publicProcedure
    .input(TriggerNotificationSchema)
    .mutation(async ({ input }) => {
      const { to, templateId, payload } = input

      try {
        const response = await sendNotification(to, templateId, payload)

        return { success: true, data: response.data }
      } catch (error) {
        throw new Error((error as Error).message)
      }
    }),
})
