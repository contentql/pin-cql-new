import { env } from '@env'
import { ChatProviderIdEnum, Novu } from '@novu/node'
import type { CollectionConfig } from 'payload/types'
import Stripe from 'stripe'

import { ADMIN_ACCESS_ROLES, DEFAULT_USER_ROLE } from '@/lib/auth/config'
import { getAuthJsCookieName, getCurrentUser } from '@/lib/auth/edge'
import { revalidateUser } from '@/lib/payload/actions'
import { isAdmin, isAdminOrCurrentUser } from '@/payload/access'
import {
  ADMIN_AUTH_GROUP,
  COLLECTION_SLUG_USER,
} from '@/payload/collections/constants'
import parseCookieString from '@/utils/parseCookieString'

const stripeSDK = new Stripe(env.STRIPE_SECRET_KEY)
const novu = new Novu(env.NOVU_API_KEY)

export const Users: CollectionConfig = {
  slug: COLLECTION_SLUG_USER,
  admin: {
    group: ADMIN_AUTH_GROUP,
    useAsTitle: 'email',
  },

  endpoints: [
    {
      path: '/refresh-token',
      method: 'post',
      async handler(request) {
        if (!request?.url)
          return new Response('No request URL provided', { status: 400 })

        const requestUrl = new URL(request.url)
        requestUrl.pathname = '/api/auth/session'

        const newRequest = new Request(requestUrl.toString(), {
          method: 'GET',
          headers: new Headers(request.headers),
        })

        try {
          const response = await fetch(newRequest)
          const data = await response.json()

          if (!response.ok) {
            throw new Error('Failed to refresh token')
          }

          const responseCookies = parseCookieString(
            String(response.headers.get('Set-Cookie') || ''),
          )
          const authCooke = responseCookies?.[getAuthJsCookieName()] ?? null

          const responseBody = JSON.stringify({
            message: 'Token refresh successful',
            refreshToken: authCooke?.value,
            exp:
              authCooke && authCooke?.expires
                ? Math.floor(authCooke.expires.getTime() / 1000)
                : null,
            user: data.user,
          })

          return new Response(responseBody, {
            status: response.status,
            headers: response.headers,
          })
        } catch (error) {
          console.log(error)
          return new Response(
            JSON.stringify({ message: 'Token refresh failed' }),
            { status: 401 },
          )
        }
      },
    },
  ],

  auth: {
    cookies: {
      secure: true,
    },
    strategies: [
      {
        name: 'next-auth',
        authenticate: async ({ headers, payload }) => {
          const currentUser = await getCurrentUser({
            headers,
            payload,
            cache: true,
          })
          if (!currentUser) return null
          return {
            ...currentUser,
            collection: COLLECTION_SLUG_USER,
          }
        },
      },
    ],
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (operation === 'create') {
          const payload = req.payload
          const { docs } = await payload.find({
            collection: 'users',
            limit: 1,
          })

          const customer = await stripeSDK.customers.create({
            name: data.name,
            email: data.email,
          })

          const dataWithStripeDetails = {
            ...data,
            stripeCID: customer.id,
            stripeJSON: customer,
          }

          if (docs.length === 0) {
            return {
              ...dataWithStripeDetails,
              role: 'admin',
            }
          }

          return dataWithStripeDetails
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        const payload = req.payload
        await revalidateUser(doc, payload)

        if (operation === 'create') {
          stripeSDK.customers.update(doc.stripeCID, {
            metadata: {
              user_id: doc.id,
            },
          })

          console.log('stripe updated successfully')
        }
      },

      async ({ doc, operation }) => {
        if (operation === 'create') {
          const [firstName, lastName] = doc.name.split(' ')

          await novu.subscribers.identify(doc?.id, {
            firstName,
            lastName,
            email: doc?.email,
            avatar: doc?.imageUrl || '',
            locale: 'en-US',
            channels: [
              {
                providerId: ChatProviderIdEnum.MsTeams,
                credentials: {
                  webhookUrl: env.MS_TEAMS_WEBHOOK_URL_FOR_NOVU,
                },
              },
            ],
          })
        }
      },
    ],
  },
  access: {
    admin: async ({ req }) => {
      return ADMIN_ACCESS_ROLES.includes(req?.user?.role || DEFAULT_USER_ROLE)
    },
    read: isAdminOrCurrentUser,
    create: isAdmin,
    update: isAdmin,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    { name: 'name', type: 'text', saveToJWT: true },
    { name: 'imageUrl', type: 'text', saveToJWT: true },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
      saveToJWT: true,
    },
    { name: 'emailVerified', type: 'date' },
    { name: 'stripeCID', type: 'text', saveToJWT: true },
    { name: 'stripeJSON', type: 'json', hidden: true },
    {
      name: 'accounts',
      type: 'array',
      saveToJWT: false,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'provider', type: 'text', admin: { readOnly: true } },
            {
              name: 'providerAccountId',
              type: 'text',
              admin: { readOnly: true },
            },
          ],
        },
      ],
    },
    {
      name: 'verificationTokens',
      type: 'array',
      saveToJWT: false,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'identifier', type: 'text', admin: { readOnly: true } },
            { name: 'token', type: 'text', admin: { readOnly: true } },
            { name: 'expires', type: 'date', admin: { readOnly: true } },
          ],
        },
      ],
    },
    {
      name: 'railwayApiToken',
      type: 'text',
      label: 'Railway Api Token',
      saveToJWT: true,
    },
    {
      name: 'plan',
      type: 'text',
      defaultValue: 'Basic',
      saveToJWT: true,
    },
  ],
} as const
