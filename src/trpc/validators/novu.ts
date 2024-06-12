import { z } from 'zod'

export const TriggerNotificationSchema = z.object({
  to: z.object({
    subscriberId: z.string(),
  }),
  templateId: z.string(),
  notificationPayload: z.record(z.any()),
})
