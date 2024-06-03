import { GlobalConfig } from 'payload/types'

import { User } from '~/payload-types'

export const VARIABLE_SLUG = 'variables'

export const variables: GlobalConfig = {
  slug: VARIABLE_SLUG,
  fields: [
    {
      name: 'project_id',
      label: 'Project_id',
      type: 'text',
    },
    {
      name: 'changed_variable',
      label: 'Changed_variable',
      type: 'text',
    },
    {
      name: 'is_varaible_changed',
      label: 'Is_varaible_changed',
      type: 'checkbox',
      defaultValue: false,
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
