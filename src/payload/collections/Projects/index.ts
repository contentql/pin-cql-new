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
      admin: { description: 'Name of the railway template.' },
    },
    {
      name: 'projectId',
      type: 'text',
      label: 'projectId',
      required: true,
      admin: { description: 'ProjectId of the railway template.' },
    },
    {
      name: 'workflowId',
      type: 'text',
      label: 'workflowId',
      required: true,
      admin: { description: 'workflowId of the railway template.' },
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
