import { User } from '@payload-types'
import { CollectionConfig } from 'payload/types'

// import { self } from './access/self'
// import { assignUserId } from './field-level-hooks/assignUserId'

export const Projects: CollectionConfig = {
  slug: 'projects',
  //   access: {
  //     create: self,
  //     read: self,
  //     update: self,
  //     delete: self,
  //   },
  fields: [
    {
      name: 'projects',
      type: 'array',
      fields: [
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
      ],
    },
    {
      name: 'user_id',
      label: 'User Id',
      type: 'relationship',
      relationTo: ['users'],
      hasMany: false,
      defaultValue: ({ user }: { user: User }) => {
        console.log('user', user)
        if (!user) return undefined

        return { relationTo: 'users', value: user?.id }
      },
      admin: {
        position: 'sidebar',
        description: 'The user associated with this cart.',
      },
      //   hooks: {
      //     beforeChange: [assignUserId],
      //   },
    },
  ],
}
