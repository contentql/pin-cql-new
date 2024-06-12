import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from '@novu/notification-center'

export const NovuNotificationCenterProvider = () => {
  return (
    <NovuProvider
      subscriberId={'66653dfe23e0f1799e225dff'}
      applicationIdentifier={'DTgY8wjoM-ov'}>
      <PopoverNotificationCenter colorScheme='light'>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
