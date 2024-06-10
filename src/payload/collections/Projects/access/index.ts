import { Access } from 'payload/types'

export const isAdminOrCurrentUser: Access = ({ req }) => {
  if (req?.user?.role === 'admin') return true

  return {
    'user_id.value': {
      equals: req?.user?.id,
    },
  }
}
