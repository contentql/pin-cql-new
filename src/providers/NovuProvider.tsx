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
      applicationIdentifier={env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER}
      // i18n={{
      //   lang: 'de',
      //   translations: {
      //     poweredBy: 'ContentQL',
      //   },
      // }}
      stores={[
        { storeId: 'default_store' },
        { storeId: 'Deployments', query: { feedIdentifier: 'Deployments' } },
        { storeId: 'General', query: { feedIdentifier: 'General' } },
      ]}>
      <PopoverNotificationCenter
        colorScheme='light'
        tabs={[
          { name: 'All', storeId: 'default_store' },
          { name: 'General', storeId: 'General' },
          { name: 'Deployments', storeId: 'Deployments' },
        ]}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
