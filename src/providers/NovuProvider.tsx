import { env } from '@env'
import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from '@novu/notification-center'
import { User } from 'payload-types'

interface Props {
  user: User
}

export const NovuNotificationCenterProvider: React.FC<Props> = ({ user }) => {
  return (
    <NovuProvider
      subscriberId={user.id}
      applicationIdentifier={env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER}>
      <PopoverNotificationCenter colorScheme='light'>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
