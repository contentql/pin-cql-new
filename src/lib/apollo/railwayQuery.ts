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

export const TEMPLATE_DEPLOY_MUTATION = gql`
  mutation TemplateDeploy($input: TemplateDeployInput!) {
    railway {
      templateDeploy(input: $input) {
        projectId
        workflowId
      }
    }
  }
`

export const TEMPLATE_DELETE_MUTATION = gql`
  mutation ProjectDelete($id: String!) {
    railway {
      projectDelete(id: $id)
    }
  }
`

export const TEMPLATE_UPDATE_MUTATION = gql`
  mutation UpdateEnv($input: VariableCollectionUpsertInput!) {
    railway {
      variableCollectionUpsert(input: $input)
    }
  }
`

export const TEMPLATE_REDEPLOY_MUTATION = gql`
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

export const GET_VARIABLES = gql`
  query GetVariables(
    $environmentId: String!
    $projectId: String!
    $serviceId: String!
  ) {
    railway {
      variables(
        environmentId: $environmentId
        projectId: $projectId
        serviceId: $serviceId
      )
    }
  }
`
