'use client'

import { useState } from 'react'

import { Switch } from '@/components/ui/switch'

import DatabaseVariableForm from './DatabaseVariableForm'

const SettingsTabContent = ({ projectId }: { projectId: string }) => {
  const [showDatabaseFrom, setShowDatabaseForm] = useState(false)
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
              <h3 className='text-lg font-medium'>Database</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Provide mongo database url.
              </p>
            </div>
            <Switch
              onClick={() => setShowDatabaseForm(!showDatabaseFrom)}
              aria-label='Analytics'
            />
          </div>
          {showDatabaseFrom && <DatabaseVariableForm projectId={projectId} />}
          {/* <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <div className='space-y-1'>
              <h3 className='text-lg font-medium'>Database</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Provide mongo database url.
              </p>
            </div>
            <Switch aria-label='Analytics' />
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default SettingsTabContent
