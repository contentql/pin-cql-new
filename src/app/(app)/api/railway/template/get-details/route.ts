import { gql } from '@apollo/client'
import { NextRequest } from 'next/server'

import client from '@/lib/apollo/apolloClient'

// Define the mutation
const GET_TEMPLATE_DETAILS = gql`
  query GetProjectDetails($id: String!) {
    railway {
      project(id: $id) {
        baseEnvironmentId
        createdAt
        deletedAt
        description
        expiredAt
        id
        isPublic
        isTempProject
        name
        prDeploys
        prForks
        subscriptionPlanLimit
        subscriptionType
        teamId
        updatedAt
        services {
          edges {
            node {
              id
              name
            }
          }
        }
        environments {
          edges {
            node {
              id
              name
            }
          }
        }
        deployments {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()

    const { data } = await client.mutate({
      mutation: GET_TEMPLATE_DETAILS,
      variables: { id },
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error during getting template details:', error)

    return new Response(
      JSON.stringify({ error: 'Failed to get template details' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
