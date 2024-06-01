import { z } from 'zod'

const secret = z
  .string()
  .length(32)
  .regex(/^[a-zA-Z]+$/)

const serviceVariable = z.record(z.string(), z.union([z.string(), secret]))

const service = z.object({
  owner: z.string(),
  name: z.string(),
  isPrivate: z.boolean(),
  commit: z.nullable(z.string()),
  variables: serviceVariable,
  template: z.string(),
  serviceName: z.string(),
  serviceIcon: z.nullable(z.string()),
  startCommand: z.nullable(z.string()),
  rootDirectory: z.nullable(z.string()),
  healthcheckPath: z.nullable(z.string()),
  hasDomain: z.boolean(),
  tcpProxyApplicationPort: z.number().optional(),
  volumes: z.array(z.object({ mountPath: z.string() })).optional(),
})

export const createEmptyTemplate = z.object({
  // input: z.object({
  defaultEnvironmentName: z.string(),
  name: z.string(),
  // }),
})

export const createWebhook = z.object({
  // input: z.object({
  projectId: z.string(),
  url: z.string(),
  // }),
})

export const mongoTemplateDeploy = z.object({
  environmentId: z.string(),
  projectId: z.string(),
})

export const templateDeploy = z.object({
  input: z.object({
    services: z.array(service),
    templateCode: z.string(),
    teamId: z.string(),
  }),
})

export const getDetailsSchema = z.object({
  id: z.string(),
})

export const templateDelete = z.object({
  id: z.string(),
})

export const templateVariablesUpdate = z.object({
  input: z.object({
    environmentId: z.string(),
    serviceId: z.string(),
    projectId: z.string(),
    variables: z.any(),
  }),
})

export const templateUpdate = z.object({
  id: z.string(),
  input: z.object({
    name: z.string(),
    description: z.string(),
  }),
})

export const serviceReDeploy = z.object({
  environmentId: z.string(),
  serviceId: z.string(),
})

export const getVariables = z.object({
  environmentId: z.string(),
  projectId: z.string(),
  serviceId: z.string(),
})

export const deploymentRedeploy = z.object({
  id: z.string(),
})

export const deploymentLogs = z.object({
  id: z.string(),
})
