import { gql } from '@apollo/client'
import { NextRequest } from 'next/server'

import client from '@/lib/apollo/apolloClient'

const GET_PROJECTS = gql`
  query GetProjects {
    railway {
      projects {
        edges {
          node {
            createdAt
            baseEnvironmentId
            description
            id
            name
            services {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function GET(req: NextRequest) {
  try {
    const { data } = await client.query({
      query: GET_PROJECTS,
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error during getting projects:', error)

    return new Response(JSON.stringify({ error: 'Failed to get projects' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
