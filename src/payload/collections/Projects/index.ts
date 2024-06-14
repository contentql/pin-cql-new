import { User } from '@payload-types'
import { CollectionConfig } from 'payload/types'

import { isAdminOrCurrentUser } from './access'

// import { assignUserId } from './field-level-hooks/assignUserId'

export const Projects: CollectionConfig = {
  slug: 'projects',

  access: {
    create: isAdminOrCurrentUser,
    read: isAdminOrCurrentUser,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: { description: 'Name of the vercel project.' },
    },
    {
      name: 'projectId',
      type: 'text',
      label: 'projectId',
      required: true,
      admin: { description: 'ProjectId of the vercel project.' },
    },
    {
      name: 'workflowId',
      type: 'text',
      label: 'workflowId',
      required: true,
      admin: { description: 'workflowId of the railway template.' },
    },
    {
      name: 'isNewProject',
      type: 'checkbox',
      label: 'Is New Project',
    },
    {
      name: 'isDeploying',
      type: 'checkbox',
      label: 'Is Project Deploying',
    },
    {
      name: 'deploymentEventMessages',
      type: 'array',
      fields: [
        {
          name: 'event',
          type: 'text',
          label: 'Event',
        },
      ],
    },
    {
      name: 'userEnvironmentVariables',
      label: 'Environment Variables',
      type: 'array',
      admin: { description: 'Environment Variables updated by user.' },
      fields: [
        {
          name: 'variableName',
          label: 'Variable Name',
          type: 'text',
        },
        {
          name: 'key',
          label: 'Key',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'user_id',
      label: 'User Id',
      type: 'relationship',
      relationTo: ['users'],
      hasMany: false,
      defaultValue: ({ user }: { user: User }) => {
        if (!user) return undefined

        return { relationTo: 'users', value: user?.id }
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
