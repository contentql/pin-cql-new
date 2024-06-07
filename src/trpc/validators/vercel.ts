import { z } from 'zod'

export const getProjectByNameOrIdSchema = z.object({
  nameOrId: z.string(),
})

export const environmentVariableSchema = z.object({
  key: z.string(),
  target: z.array(z.enum(['development', 'preview', 'production'])),
  gitBranch: z.string().nullable().optional(),
  type: z.enum(['system', 'secret', 'encrypted', 'plain', 'sensitive']),
  value: z.string(),
})

export const gitRepositorySchema = z.object({
  repo: z.string(),
  type: z.enum(['github', 'gitlab', 'bitbucket']),
})

export const createProjectWithGithubRepoSchema = z.object({
  name: z.string(),
  buildCommand: z.string().nullable().optional(),
  commandForIgnoringBuildStep: z.string().nullable().optional(),
  devCommand: z.string().nullable().optional(),
  environmentVariables: z.array(environmentVariableSchema),
  framework: z.enum([
    'blitzjs',
    'nextjs',
    'gatsby',
    'remix',
    'astro',
    'hexo',
    'eleventy',
    'docusaurus-2',
    'docusaurus',
    'preact',
    'solidstart-1',
    'solidstart',
    'dojo',
    'ember',
    'vue',
    'scully',
    'ionic-angular',
    'angular',
    'polymer',
    'svelte',
    'sveltekit',
    'sveltekit-1',
    'ionic-react',
    'create-react-app',
    'gridsome',
    'umijs',
    'sapper',
    'saber',
    'stencil',
    'nuxtjs',
    'redwoodjs',
    'hugo',
    'jekyll',
    'brunch',
    'middleman',
    'zola',
    'hydrogen',
    'vite',
    'vitepress',
    'vuepress',
    'parcel',
    'sanity',
    'storybook',
  ]),
  gitRepository: gitRepositorySchema,
  installCommand: z.string().nullable().optional(),
  outputDirectory: z.string().nullable().optional(),
  publicSource: z.boolean().nullable().optional(),
  rootDirectory: z.string().nullable().optional(),
  serverlessFunctionRegion: z.string().default('bom1'),
})

export const createWebhookByProjectIdSchema = z.object({
  url: z.string().url(),
  events: z
    .array(
      z.enum([
        'deployment.created',
        'deployment.error',
        'deployment.canceled',
        'deployment.succeeded',
        'project.created',
        'project.removed',
      ]),
    )
    .min(1),
  projectIds: z.array(z.string()).min(1).max(50),
})
