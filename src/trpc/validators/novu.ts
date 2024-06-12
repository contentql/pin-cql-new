import { z } from 'zod'

export const TriggerNotificationSchema = z.object({
  to: z.object({
    subscriberId: z.string(),
  }),
  templateId: z.string(),
  payload: z.record(z.any()),
})
