import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

const payload = await getPayload({
  config: configPromise,
})

export async function POST(req: NextRequest) {
  try {
    const event = await req.json()
    console.log(event)

    if (event.type === 'deployment.created') {
      await payload.update({
        collection: 'projects',
        where: {
          name: {
            equals: event.payload.name,
          },
        },
        data: {
          isDeploying: true,
        },
      })
    } else if (event.type === 'deployment.succeeded') {
      await payload.update({
        collection: 'projects',
        where: {
          name: {
            equals: event.payload.name,
          },
        },
        data: {
          isDeploying: false,
          deploymentEventMessages: [],
          isNewProject: false,
        },
      })
    } else if (event.type === 'deployment.error') {
      await payload.update({
        collection: 'projects',
        where: {
          name: {
            equals: event.payload.name,
          },
        },
        data: {
          isDeploying: false,
          isNewProject: false,
        },
      })
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { status: 'error', message: 'Invalid JSON' },
      { status: 400 },
    )
  }
}
