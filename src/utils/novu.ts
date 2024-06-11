import { env } from '@env'
import { Novu } from '@novu/node'

const novu = new Novu(env.NOVU_API_KEY)

interface Subscriber {
  subscriberId: string
}

interface Payload {
  [key: string]: any
}

export const sendNotification = async (
  to: Subscriber,
  templateId: string,
  payload: Payload,
) => {
  try {
    const response = await novu.trigger(templateId, {
      to,
      payload,
    })

    return response
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}
