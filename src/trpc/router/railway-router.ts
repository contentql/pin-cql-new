import { env } from '@env'
import {
  adjectives,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import z from 'zod'

import client from '@/lib/apollo/apolloClient'
import {
  DEPLOYMENT_LOGS,
  DEPLOYMENT_REDEPLOY,
  GET_PROJECTS,
  GET_TEMPLATE_DETAILS,
  GET_VARIABLES,
  TEMPLATE_DELETE_MUTATION,
  TEMPLATE_DEPLOY_MUTATION,
  TEMPLATE_REDEPLOY_MUTATION,
  TEMPLATE_UPDATE_MUTATION,
  TEMPLATE_VARIABLES_UPDATE_MUTATION,
} from '@/lib/apollo/railwayQuery'
import {
  deploymentLogs,
  deploymentRedeploy,
  getDetailsSchema,
  getVariables,
  serviceReDeploy,
  templateDelete,
  templateUpdate,
  templateVariablesUpdate,
} from '@/lib/apollo/railwayTypes'
import { publicProcedure, router, userProcedure } from '@/trpc'

export const railwayRouter = router({
  // Get all projects
  getProjects: userProcedure.query(async ({}) => {
    try {
      // Fetch data using Apollo Client
      const { data } = await client.query({
        query: GET_PROJECTS,
      })

      // Return the data
      return data
    } catch (error) {
      console.error('Error during getting projects:', error)
      throw new Error('Error during getting projects')
    }
  }),

  // Get details of a specific template
  getDetails: userProcedure
    .input(getDetailsSchema)
    .query(async ({ input, ctx }) => {
      const { id } = input
      try {
        const { data } = await client.mutate({
          mutation: GET_TEMPLATE_DETAILS,
          variables: { id },
        })
        return data
      } catch (error) {
        console.error('Error during getting template details:', error)
        throw new Error('Error during getting template details')
      }
    }),

  // Create a new template
  templateDeploy: userProcedure.input(z.any()).mutation(async ({ input }) => {
    const serviceVariable = input?.data!

    // const customConfig: Config = {
    //   dictionaries: [adjectives, colors, starWars],
    //   separator: '-',
    //   length: 2,
    // }

    const randomName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
    })

    // const shortName: string = uniqueNamesGenerator(customConfig)

    // Use the function to generate a random string of length 5 and concatenate it with the project name
    const updatedProjectName = `${serviceVariable?.Project_Name}_${randomName}`

    console.log({ serviceVariable })
    try {
      // Mutate data using Apollo Client with variables
      const { data } = await client.mutate({
        mutation: TEMPLATE_DEPLOY_MUTATION,
        variables: {
          input: {
            services: [
              // {
              //   owner: 'akhil-naidu',
              //   name: 'MongoDB',
              //   isPrivate: false,
              //   commit: null,
              //   variables: {
              //     MONGOHOST: '${{ RAILWAY_TCP_PROXY_DOMAIN }}',
              //     MONGOPORT: '${{ RAILWAY_TCP_PROXY_PORT }}',
              //     MONGOUSER: '${{ MONGO_INITDB_ROOT_USERNAME }}',
              //     MONGO_URL:
              //       'mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}}',
              //     MONGOPASSWORD: '${{ MONGO_INITDB_ROOT_PASSWORD }}',
              //     MONGO_PRIVATE_URL:
              //       'mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:27017',
              //     MONGO_INITDB_ROOT_PASSWORD:
              //       '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
              //     MONGO_INITDB_ROOT_USERNAME: 'mongo',
              //   },
              //   template: 'mongo',
              //   serviceName: 'MongoDB',
              //   serviceIcon: 'https://devicons.railway.app/i/mongodb.svg',
              //   startCommand:
              //     'docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0',
              //   rootDirectory: null,
              //   healthcheckPath: null,
              //   hasDomain: false,
              //   tcpProxyApplicationPort: 27017,
              //   volumes: [
              //     {
              //       mountPath: '/data/db',
              //     },
              //   ],
              // },
              {
                owner: 'akhil-naidu',
                name: serviceVariable?.Project_Name,
                isPrivate: false,
                commit: null,
                serviceIcon:
                  'https://pub-ce94fe258c7740b3a579a329e72059e4.r2.dev/pin-hcms%2FContentQL_Brandmark_Light%402x-1000x1000.png',
                variables: {
                  DATABASE_URI: `mongodb+srv://akhil:iwillhack@contentql.av5ynge.mongodb.net/prod-${updatedProjectName}`,
                  PAYLOAD_SECRET:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
                  NEXT_PUBLIC_PUBLIC_URL: 'https://${{RAILWAY_PUBLIC_DOMAIN}}',
                  PAYLOAD_URL: 'https://${{RAILWAY_PUBLIC_DOMAIN}}',
                  S3_ENDPOINT: serviceVariable.S3_ENDPOINT || env.S3_ENDPOINT,
                  S3_ACCESS_KEY_ID:
                    serviceVariable.S3_ACCESS_KEY_ID || env.S3_ACCESS_KEY_ID,
                  S3_SECRET_ACCESS_KEY:
                    serviceVariable.S3_SECRET_ACCESS_KEY ||
                    env.S3_SECRET_ACCESS_KEY,
                  S3_BUCKET: serviceVariable.S3_BUCKET || env.S3_BUCKET,
                  S3_REGION: serviceVariable.S3_REGION || env.S3_REGION,
                  RESEND_API_KEY:
                    serviceVariable.RESEND_API_KEY || env.RESEND_API_KEY,
                  RESEND_SENDER_EMAIL:
                    serviceVariable.RESEND_SENDER_EMAIL ||
                    env.RESEND_SENDER_EMAIL,
                  RESEND_SENDER_NAME:
                    serviceVariable.RESEND_SENDER_NAME ||
                    env.RESEND_SENDER_NAME,
                  NEXT_PUBLIC_IS_LIVE: 'true',
                  PAYLOAD_PUBLIC_DRAFT_SECRET:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")}}',
                  NEXT_PRIVATE_DRAFT_SECRET:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
                  REVALIDATION_KEY:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
                  AUTH_SECRET: env.AUTH_SECRET,
                  AUTH_TRUST_HOST: 'true',
                  AUTH_VERPOSE: 'true',
                  AUTH_URL: 'https://${{RAILWAY_PUBLIC_DOMAIN}}',
                  AUTH_GITHUB_ID:
                    serviceVariable.AUTH_GITHUB_ID || env.AUTH_GITHUB_ID,
                  AUTH_GITHUB_SECRET:
                    serviceVariable.AUTH_GITHUB_SECRET ||
                    env.AUTH_GITHUB_SECRET,
                  SUBSCRIPTION_PLAN: 'creator',
                  OPENAPI_KEY: serviceVariable.OPENAPI_KEY || env.OPENAPI_KEY,
                  NEXT_PRIVATE_REVALIDATION_KEY:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
                },
                template: 'ghcr.io/contentql/pin-hcms:latest',
                serviceName: updatedProjectName,
                startCommand: null,
                rootDirectory: null,
                healthcheckPath: null,
                hasDomain: true,
                volumes: [],
              },
            ],
            templateCode: 'Ta1qNm',
            teamId: 'dd9568ff-b6dd-4151-90a0-ae02633e7705',
          },
        },
      })

      return data
    } catch (error) {
      console.error('Error during template deployment:', error)
      throw new Error('Error during template deployment')
    }
  }),

  // Delete a template
  templateDelete: userProcedure
    .input(templateDelete)
    .mutation(async ({ input }) => {
      const { id } = input
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_DELETE_MUTATION,
          variables: { id },
        })

        return data
      } catch (error) {
        console.error('Error during template deletion:', error)

        throw new Error('Error during template deletion')
      }
    }),

  // Update a template
  templateUpdate: userProcedure
    .input(templateUpdate)
    .mutation(async ({ input: request }) => {
      const { id, input } = request
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_UPDATE_MUTATION,
          variables: { id, input },
        })

        return data
      } catch (error) {
        console.error('Error during template updating:', error)

        throw new Error('Error during template update')
      }
    }),

  // Update a template
  templateVariablesUpdate: userProcedure
    .input(templateVariablesUpdate)
    .mutation(async ({ input: requestData }) => {
      const { input } = requestData
      console.log('requestData', requestData)
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_VARIABLES_UPDATE_MUTATION,
          variables: { input },
        })

        return data
      } catch (error) {
        console.error('Error during template updating:', error)

        throw new Error('Error during template update')
      }
    }),

  // Re-deploy a template
  serviceReDeploy: userProcedure
    .input(serviceReDeploy)
    .mutation(async ({ input }) => {
      const { environmentId, serviceId } = input
      try {
        const { data } = await client.mutate({
          mutation: TEMPLATE_REDEPLOY_MUTATION,
          variables: { environmentId, serviceId },
        })
        return data
      } catch (error) {
        console.error('Error during template re-deployment:', error)
        throw new Error('Error during template re-deployment')
      }
    }),

  getVariables: userProcedure
    .input(getVariables)
    .mutation(async ({ input }) => {
      const { environmentId, projectId, serviceId } = input

      try {
        const { data } = await client.mutate({
          mutation: GET_VARIABLES,
          variables: { environmentId, projectId, serviceId },
        })
        return data
      } catch (error) {
        console.error(error)
        throw new Error('Error during getting variables')
      }
    }),

  deploymentReDeploy: userProcedure
    .input(deploymentRedeploy)
    .mutation(async ({ input }) => {
      const { id } = input
      try {
        const { data } = await client.mutate({
          mutation: DEPLOYMENT_REDEPLOY,
          variables: { id },
        })
        return data
      } catch (error) {
        console.error(error)
        throw new Error('Error during deployment re-deployment')
      }
    }),

  deploymentLogs: publicProcedure
    .input(deploymentLogs)
    .subscription(async ({ input }) => {
      const { id } = input
      try {
        const data = client.subscribe({
          query: DEPLOYMENT_LOGS,
          variables: { id },
        })
        return data
      } catch (error) {
        console.log(error)
        throw new Error('Error getting deployment logs')
      }
    }),
})
