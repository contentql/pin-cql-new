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

export const templateCreate = z.object({
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
