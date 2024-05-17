'use client'

import { Icons } from '../../(marketing)/(non-protected)/[[...route]]/_components/icons'
import React from 'react'

import { Button } from '@/components/ui/button'

import CreateProjectAlert from './create-project-alert'
import { DashboardHeader } from './header'
import { DashboardShell } from './shell'

const DashboardView = () => {
  const [input, setInput] = React.useState('')
  const [showCreateAlert, setShowCreateAlert] = React.useState(false)

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Projects'
        text='Create and manage your projects.'>
        <Button onClick={() => setShowCreateAlert(true)}>
          <Icons.add className='mr-2 h-4 w-4' />
          New Project
        </Button>
        <CreateProjectAlert
          showCreateAlert={showCreateAlert}
          setShowCreateAlert={setShowCreateAlert}
          input={input}
          setInput={setInput}
        />
      </DashboardHeader>
      {/* <Projects setShowCreateAlert={setShowCreateAlert} /> */}
    </DashboardShell>
  )
}

export default DashboardView
