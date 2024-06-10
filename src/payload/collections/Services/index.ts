import { User } from '@payload-types'
import { CollectionConfig } from 'payload/types'

// import { assignUserId } from './field-level-hooks/assignUserId'

export const Services: CollectionConfig = {
  slug: 'services',

  fields: [
    {
      name: 'serviceId',
      type: 'text',
      label: 'ServiceId',
    },
    {
      name: 'changedVariables',
      type: 'array',
      label: 'Services',
      fields: [
        {
          name: 'name',
          label: 'Variable name',
          type: 'text',
        },
        {
          name: 'updatedValue',
          label: 'variable updated value',
          type: 'text',
        },
      ],
    },
    {
      name: 'isVariableChanged',
      label: 'isVariableChanged',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'project_id',
      label: 'Project ID',
      type: 'relationship',
      relationTo: ['projects'],
      hasMany: false,
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
