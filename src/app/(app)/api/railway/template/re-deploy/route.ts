import { gql } from '@apollo/client'
import { NextRequest } from 'next/server'

import client from '@/lib/apollo/apolloClient'

// Define the mutation
const TEMPLATE_DEPLOY_MUTATION = gql`
  mutation EnvironmentTriggersDeploy(
    $environmentId: String!
    $serviceId: String!
  ) {
    railway {
      serviceInstanceRedeploy(
        environmentId: $environmentId
        serviceId: $serviceId
      )
    }
  }
`

export async function POST(req: NextRequest) {
  try {
    const { environmentId, serviceId } = await req.json()

    const { data } = await client.mutate({
      mutation: TEMPLATE_DEPLOY_MUTATION,
      variables: { environmentId, serviceId },
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error during template redeploying:', error)

    return new Response(
      JSON.stringify({ error: 'Failed to re-deploy template' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
