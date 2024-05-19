import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { setContext } from 'apollo-link-context'
import { gql } from 'graphql-tag'
import fetch from 'node-fetch'

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    templateDeploy(input: TemplateDeployInput!): TemplateDeployResponse
  }

  input TemplateDeployInput {
    services: [ServiceInput!]!
    templateCode: String!
    teamId: String!
  }

  input ServiceInput {
    owner: String!
    name: String!
    isPrivate: Boolean!
    commit: String
    variables: VariablesInput!
    template: String!
    serviceName: String!
    serviceIcon: String
    startCommand: String
    rootDirectory: String
    healthcheckPath: String
    hasDomain: Boolean!
    tcpProxyApplicationPort: Int
    volumes: [VolumeInput!]
  }

  input VariablesInput {
    MONGOHOST: String
    MONGOPORT: String
    MONGOUSER: String
    MONGO_URL: String
    MONGOPASSWORD: String
    MONGO_PRIVATE_URL: String
    MONGO_INITDB_ROOT_PASSWORD: String
    MONGO_INITDB_ROOT_USERNAME: String
    DATABASE_URI: String
    PAYLOAD_SECRET: String
    NEXT_PUBLIC_PUBLIC_URL: String
    PAYLOAD_URL: String
    S3_ENDPOINT: String
    S3_ACCESS_KEY_ID: String
    S3_SECRET_ACCESS_KEY: String
    S3_BUCKET: String
    S3_REGION: String
    RESEND_API_KEY: String
    RESEND_SENDER_EMAIL: String
    RESEND_SENDER_NAME: String
    NEXT_PUBLIC_IS_LIVE: String
    PAYLOAD_PUBLIC_DRAFT_SECRET: String
    NEXT_PRIVATE_DRAFT_SECRET: String
    REVALIDATION_KEY: String
    NEXT_PRIVATE_REVALIDATION_KEY: String
    AUTH_SECRET: String
    AUTH_TRUST_HOST: String
    AUTH_VERPOSE: String
    AUTH_URL: String
    AUTH_GITHUB_ID: String
    AUTH_GITHUB_SECRET: String
  }

  input VolumeInput {
    mountPath: String!
  }

  type TemplateDeployResponse {
    projectId: String
    workflowId: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello Manoj!',
  },
  Mutation: {
    templateDeploy: async (_: any, { input }: any) => {
      // Set up Apollo Client
      const httpLink = new HttpLink({
        uri: 'https://hasura-template-production.up.railway.app/v1/graphql',
        //@ts-ignore
        fetch,
      })

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer 8ba64bb8-5720-491e-bc46-eea64a9e11ff`,
            'x-hasura-admin-secret': 'iwillhack',
          },
        }
      })
      const client = new ApolloClient({
        //@ts-ignore
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      })

      const DEPLOY_TEMPLATE_MUTATION = gql`
        mutation TemplateDeploy($input: TemplateDeployInput!) {
          railway {
            templateDeploy(input: $input) {
              projectId
              workflowId
            }
          }
        }
      `

      try {
        // Execute the mutation
        const res = await client.mutate({
          mutation: DEPLOY_TEMPLATE_MUTATION,
          variables: { input },
        })

        const { data } = res
        console.log('data', data)
        return data
      } catch (error) {
        console.error(error)
        throw new Error('Failed to deploy template')
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }
