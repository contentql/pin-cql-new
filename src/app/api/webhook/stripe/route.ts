import { env } from '@env'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'

const payload = await getPayload({
  config: configPromise,
})

const stripeSDK = new Stripe(env.STRIPE_SECRET_KEY)

async function fetchProductName(productId: string) {
  try {
    const response = await stripeSDK.products.retrieve(productId)
    return response.name
  } catch (error) {
    console.error('Error fetching product name:', error)
    return null
  }
}

async function updateUserCollection(
  userId: string,
  productName: string | null,
  action: string,
): Promise<void> {
  try {
    const updateData =
      action === 'remove' ? { plan: 'Basic' } : { plan: productName }

    console.log('product name', productName)
    console.log('userID', userId)

    await payload.update({
      collection: 'users',
      where: {
        id: {
          equals: userId,
        },
      },
      data: updateData,
    })
    console.log('User collection updated successfully.')
  } catch (error) {
    console.error('Error updating user collection:', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const event = await req.json()

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated'
    ) {
      const subscription = event.data.object
      const productId = subscription.items.data[0].plan.product
      const customerId = subscription.customer

      const response: any = await stripeSDK.customers.retrieve(customerId)

      const userId = response?.metadata.user_id

      if (
        event.type === 'customer.subscription.updated' &&
        subscription.cancel_at_period_end
      ) {
        await updateUserCollection(userId, null, 'remove')
      } else {
        const productName = await fetchProductName(productId)
        if (productName) {
          await updateUserCollection(userId, productName, 'update')
        } else {
          console.error('Product name not found for product ID:', productId)
        }
      }
    }

    return new NextResponse(JSON.stringify({ status: 'success' }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse('Invalid JSON', { status: 400 })
  }
}
