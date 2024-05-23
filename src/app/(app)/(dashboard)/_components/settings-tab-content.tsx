import { Switch } from '@/components/ui/switch'

const SettingsTabContent = () => {
  return (
    <section className='w-full'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>Plugins</h2>
          <p className='text-gray-500 dark:text-gray-400'>
            Enable or disable plugins to customize your experience.
          </p>
        </div>
        <div className='grid gap-4'>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium'>Analytics</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Track user activity and engagement.
              </p>
            </div>
            <Switch aria-label='Analytics' />
          </div>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium'>A/B Testing</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Run experiments to optimize your content.
              </p>
            </div>
            <Switch aria-label='A/B Testing' />
          </div>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium'>Notifications</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Keep your users informed about updates.
              </p>
            </div>
            <Switch aria-label='Notifications' />
          </div>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium'>Payments</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Integrate secure payment processing.
              </p>
            </div>
            <Switch aria-label='Payments' />
          </div>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium'>Localization</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Translate your app for global audiences.
              </p>
            </div>
            <Switch aria-label='Localization' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SettingsTabContent
