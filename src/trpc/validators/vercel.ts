import { z } from 'zod'

// Zod schema to get project by name or id
export const GetProjectByNameOrIdSchema = z.object({
  projectNameOrId: z.union([z.string(), z.number()]),
})

const CreateProjectEnvironmentVariableSchema = z.object({
  gitBranch: z.string().max(250).nullable().optional(),
  key: z.string(),
  target: z.array(z.enum(['development', 'preview', 'production'])),
  type: z
    .enum(['system', 'secret', 'encrypted', 'plain', 'sensitive'])
    .optional(),
  value: z.string(),
})

const CreateProjectGitRepositorySchema = z
  .object({
    repo: z.string(),
    type: z.enum(['github', 'gitlab', 'bitbucket']),
  })
  .optional()

// Zod schema to create a project
export const CreateProjectWithGithubRepoSchema = z.object({
  name: z.string().max(100),
  buildCommand: z.string().max(256).nullable().optional(),
  commandForIgnoringBuildStep: z.string().max(256).nullable().optional(),
  devCommand: z.string().max(256).nullable().optional(),
  environmentVariables: z
    .array(CreateProjectEnvironmentVariableSchema)
    .optional(),
  framework: z
    .enum([
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
    ])
    .optional(),
  gitRepository: CreateProjectGitRepositorySchema,
  installCommand: z.string().max(256).nullable().optional(),
  outputDirectory: z.string().max(256).nullable().optional(),
  publicSource: z.boolean().nullable().optional(),
  rootDirectory: z.string().max(256).nullable().optional(),
  serverlessFunctionRegion: z.string().max(4).default('bom1').optional(),
})

// Zod schema to create a webhook
export const CreateWebhookByProjectIdSchema = z.object({
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
  projectIds: z.array(z.string()).min(1).max(50).optional(),
})

const CreateNewDeploymentFileReferenceSchema = z
  .object({
    file: z.string(),
    sha: z.string().optional(),
    size: z.number().int().positive().optional(),
  })
  .optional()

const CreateNewDeploymentInlineFileSchema = z
  .object({
    data: z.string(),
    file: z.string(),
    encoding: z.enum(['base64', 'utf-8']).optional(),
  })
  .optional()

const CreateNewDeploymentGitSourceSchema = z
  .union([
    z.object({
      owner: z.string(),
      ref: z.string(),
      slug: z.string(),
      type: z.enum(['bitbucket']),
      sha: z.string().optional(),
    }),
    z.object({
      ref: z.string(),
      repoUuid: z.string(),
      type: z.enum(['bitbucket']),
      sha: z.string().optional(),
      workspaceUuid: z.string().optional(),
    }),
    z.object({
      projectId: z.union([z.string(), z.number()]),
      ref: z.string(),
      type: z.enum(['gitlab']),
      sha: z.string().optional(),
    }),
    z.object({
      org: z.string(),
      ref: z.string(),
      repo: z.string(),
      type: z.enum(['github']),
      sha: z.string().optional(),
    }),
    z.object({
      ref: z.string(),
      repoId: z.union([z.string(), z.number()]),
      type: z.enum(['github']),
      sha: z.string().optional(),
    }),
  ])
  .optional()

const CreateNewDeploymentGitMetadataSchema = z
  .object({
    commitAuthorName: z.string().optional(),
    commitMessage: z.string().optional(),
    commitRef: z.string().optional(),
    commitSha: z.string().optional(),
    dirty: z.boolean().optional(),
    remoteUrl: z.string().optional(),
  })
  .optional()

const CreateNewDeploymentProjectSettingsSchema = z
  .object({
    buildCommand: z.string().max(256).nullable().optional(),
    commandForIgnoringBuildStep: z.string().max(256).nullable().optional(),
    devCommand: z.string().max(256).nullable().optional(),
    framework: z
      .enum([
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
      ])
      .nullable()
      .optional(),
    installCommand: z.string().max(256).nullable().optional(),
    nodeVersion: z.enum(['20.x', '18.x', '16.x']).optional(),
    outputDirectory: z.string().max(256).nullable().optional(),
    rootDirectory: z.string().max(256).nullable().optional(),
    serverlessFunctionRegion: z.string().max(4).nullable().optional(),
    sourceFilesOutsideRootDirectory: z.boolean().optional(),
  })
  .optional()

// Zod schema to create a new deployment
export const CreateNewDeploymentByProjectNameSchema = z.object({
  name: z.string(),
  customEnvironmentSlugOrId: z.string().nullable().optional(),
  deploymentId: z.string().nullable().optional(),
  files: z
    .array(
      z.union([
        CreateNewDeploymentFileReferenceSchema,
        CreateNewDeploymentInlineFileSchema,
      ]),
    )
    .optional(),
  gitMetadata: CreateNewDeploymentGitMetadataSchema,
  gitSource: CreateNewDeploymentGitSourceSchema,
  meta: z.record(z.string()).optional(),
  monorepoManager: z.string().nullable().optional(),
  project: z.string().optional(),
  projectSettings: CreateNewDeploymentProjectSettingsSchema,
  sourceFilesOutsideRootDirectory: z.boolean(),
  target: z.enum(['staging', 'production']).optional(),
  withLatestCommit: z.boolean().optional(),
})

// Zod schema to delete a project by name or id
export const deleteProjectNameOrIdSchema = z.object({
  projectNameOrId: z.union([z.string(), z.number()]),
})

const UpsertEnvironmentVariableTypeSchema = z.enum([
  'system',
  'secret',
  'encrypted',
  'plain',
  'sensitive',
])

// Zod schema to upsert one or more environment variables
export const upsertEnvVarsByProjectNameOrIdSchema = z.object({
  projectNameOrId: z.union([z.string(), z.number()]),
  key: z.string(),
  value: z.string(),
  type: UpsertEnvironmentVariableTypeSchema,
  target: z.array(z.string()),
  gitBranch: z.string().nullable(),
  comment: z.string().max(500),
})

// Zod schema to Get environment variables by project name or id
export const GetEnvVarsByProjectNameOrIdSchema = z.object({
  projectNameOrId: z.union([z.string(), z.number()]),
})

// Zod schema to delete a environment variable by id and project name and id
export const DeleteEnvVarByIdAndProjectNameOrIdSchema = z.object({
  envVarId: z.string(),
  projectNameOrId: z.union([z.string(), z.number()]),
})

// Zod schema to edit a environment variable by id and project name or id
export const EditEnvVarByIdAndProjectNameOrIdSchema = z.object({
  envVarId: z.string(),
  projectNameOrId: z.union([z.string(), z.number()]),
  comment: z.string().max(500).optional(),
  customEnvironmentIds: z.array(z.string()).optional(),
  gitBranch: z.string().max(250).nullable().optional(),
  key: z.string().optional(),
  target: z.array(z.enum(['development', 'preview', 'production'])).optional(),
  type: z
    .enum(['system', 'secret', 'encrypted', 'plain', 'sensitive'])
    .optional(),
  value: z.string().optional(),
})

// Zod schema to update a project using name or id
export const UpdateProjectByNameOrIdSchema = z.object({
  projectNameOrId: z.union([z.string(), z.number()]),
  autoAssignCustomDomains: z.boolean().optional(),
  autoAssignCustomDomainsUpdatedBy: z.string().optional(),
  autoExposeSystemEnvs: z.boolean().optional(),
  buildCommand: z.string().max(256).nullable().optional(),
  commandForIgnoringBuildStep: z.string().max(256).nullable().optional(),
  customerSupportCodeVisibility: z.boolean().optional(),
  devCommand: z.string().max(256).nullable().optional(),
  directoryListing: z.boolean().optional(),
  enablePreviewFeedback: z.boolean().nullable().optional(),
  framework: z
    .enum([
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
    ])
    .nullable()
    .optional(),
  gitForkProtection: z.boolean().optional(),
  gitLFS: z.boolean().optional(),
  installCommand: z.string().max(256).nullable().optional(),
  name: z.string().max(100).optional(),
  nodeVersion: z
    .enum(['20.x', '18.x', '16.x', '14.x', '12.x', '10.x'])
    .optional(),
  optionsAllowlist: z
    .object({
      paths: z
        .array(z.object({ value: z.string() }))
        .min(1)
        .max(5),
    })
    .nullable()
    .optional(),
  outputDirectory: z.string().max(256).nullable().optional(),
  passwordProtection: z
    .object({
      deploymentType: z.enum([
        'all',
        'preview',
        'prod_deployment_urls_and_all_previews',
      ]),
      password: z.string().max(72).nullable().optional(),
    })
    .nullable()
    .optional(),
  publicSource: z.boolean().nullable().optional(),
  rootDirectory: z.string().max(256).nullable().optional(),
  serverlessFunctionRegion: z.string().max(4).nullable().optional(),
  skewProtectionBoundaryAt: z.number().int().optional(),
  skewProtectionMaxAge: z.number().int().optional(),
  sourceFilesOutsideRootDirectory: z.boolean().optional(),
  ssoProtection: z
    .object({
      deploymentType: z.enum([
        'all',
        'preview',
        'prod_deployment_urls_and_all_previews',
      ]),
    })
    .nullable()
    .optional(),
  trustedIps: z.object({
    deploymentType: z.enum([
      'all',
      'preview',
      'prod_deployment_urls_and_all_previews',
    ]),
    addresses: z
      .array(
        z.object({ value: z.string(), note: z.string().max(20).optional() }),
      )
      .min(1),
    protectionMode: z.enum(['exclusive', 'additional']),
  }),
})
