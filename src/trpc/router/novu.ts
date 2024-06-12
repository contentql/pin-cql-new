import { publicProcedure, router } from '@/trpc'
import { TriggerNotificationSchema } from '@/trpc/validators/novu'
import { sendNotification } from '@/utils/novu'

export const novuRouter = router({
  triggerNotification: publicProcedure
    .input(TriggerNotificationSchema)
    .mutation(async ({ input }) => {
      const { to, templateId, notificationPayload } = input

      try {
        const response = await sendNotification(
          to,
          templateId,
          notificationPayload,
        )

        return { success: true, data: response }
      } catch (error) {
        throw new Error((error as Error).message)
      }
    }),
})
