import { env } from '@env'

export const GET = async () => {
  return Response.json({
    envPayload: process.env.PAYLOAD_URL,
    envPublic: process.env.NEXT_PUBLIC_PUBLIC_URL,
    systemVariableVercelURL: process.env.VERCEL_URL,
    systemVariableVercelProductionURL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    envBasedValue: env.PAYLOAD_URL
  })
}
