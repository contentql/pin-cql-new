import { z } from 'zod'

export const getDetailsSchema = z.object({
  id: z.string(),
})
