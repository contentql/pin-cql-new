import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const changeBasedOnENV = (env: string, noHttp = false) => {
  if (process.env.NODE_ENV === 'development') {
    return `http://${env}`
  }
  if (process.env.NODE_ENV === 'production') return `https://${env}`

  return `http://${env}`
}

export const env = createEnv({
  server: {
    DATABASE_URI: z.string().min(1),
    DATABASE_URI_VERCEL: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    PAYLOAD_URL: z.string().url(),
    S3_ENDPOINT: z.string().min(1),
    S3_ENDPOINT_VERCEL: z.string().min(1),
    S3_ACCESS_KEY_ID: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(1),
    S3_BUCKET: z.string().min(1),
    S3_REGION: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESEND_SENDER_EMAIL: z.string().email(),
    RESEND_SENDER_NAME: z.string().min(1),
    PAYLOAD_PUBLIC_DRAFT_SECRET: z.string().min(1),
    REVALIDATION_KEY: z.string().min(1),
    NEXT_PRIVATE_REVALIDATION_KEY: z.string().min(1),
    NEXT_PRIVATE_DRAFT_SECRET: z.string().min(1),
    AUTH_SECRET: z.string(),
    AUTH_TRUST_HOST: z.boolean().default(true),
    AUTH_VERPOSE: z.boolean(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    HASURA_API_KEY: z.string().min(1),
    RAILWAY_SUPER_API: z.string().min(1),
    OPENAPI_KEY: z.string().min(1),
    ENCRYPTION_KEY: z.string(),
    API_VERCEL_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    SUBSCRIPTION_PLAN: z.string().min(1),
    NOVU_API_KEY: z.string().min(1),
    MS_TEAMS_WEBHOOK_URL_FOR_NOVU: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_IS_LIVE: z.boolean().default(false),
    NEXT_PUBLIC_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_HASURA_URI: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_PRICING_TABLE_ID: z.string().min(1),
    NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URI: process.env.DATABASE_URI,
    DATABASE_URI_VERCEL: process.env.DATABASE_URI_VERCEL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    NEXT_PUBLIC_PUBLIC_URL: changeBasedOnENV(
      (process.env.VERCEL_PROJECT_PRODUCTION_URL as string) ||
        (process.env.NEXT_PUBLIC_PUBLIC_URL as string),
    ),
    // NEXT_PUBLIC_PUBLIC_URL : process.env.NEXT_PUBLIC_PUBLIC_URL,
    // PAYLOAD_URL: process.env.PAYLOAD_URL,

    PAYLOAD_URL: changeBasedOnENV(
      (process.env.VERCEL_PROJECT_PRODUCTION_URL as string) ||
        (process.env.PAYLOAD_URL as string),
    ),
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ENDPOINT_VERCEL: process.env.S3_ENDPOINT_VERCEL,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_REGION: process.env.S3_REGION,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_SENDER_EMAIL: process.env.RESEND_SENDER_EMAIL,
    RESEND_SENDER_NAME: process.env.RESEND_SENDER_NAME,
    NEXT_PUBLIC_IS_LIVE: JSON.parse(process.env.NEXT_PUBLIC_IS_LIVE!),
    PAYLOAD_PUBLIC_DRAFT_SECRET: process.env.PAYLOAD_PUBLIC_DRAFT_SECRET,
    NEXT_PRIVATE_DRAFT_SECRET: process.env.NEXT_PRIVATE_DRAFT_SECRET,
    REVALIDATION_KEY: process.env.REVALIDATION_KEY,
    NEXT_PRIVATE_REVALIDATION_KEY: process.env.NEXT_PRIVATE_REVALIDATION_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: true,
    AUTH_VERPOSE: true,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    NEXT_PUBLIC_HASURA_URI: process.env.NEXT_PUBLIC_HASURA_URI,
    HASURA_API_KEY: process.env.HASURA_API_KEY,
    RAILWAY_SUPER_API: process.env.RAILWAY_SUPER_API,
    OPENAPI_KEY: process.env.OPENAPI_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    SUBSCRIPTION_PLAN: process.env.SUBSCRIPTION_PLAN,
    API_VERCEL_KEY: process.env.API_VERCEL_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_PRICING_TABLE_ID: process.env.NEXT_PUBLIC_PRICING_TABLE_ID,
    NOVU_API_KEY: process.env.NOVU_API_KEY,
    NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER:
      process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER,
    MS_TEAMS_WEBHOOK_URL_FOR_NOVU: process.env.MS_TEAMS_WEBHOOK_URL_FOR_NOVU,
  },
})
