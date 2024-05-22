import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
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

export const GET_TEMPLATE_DETAILS = gql`
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
