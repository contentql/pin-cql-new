import { Icons } from '../../(marketing)/(non-protected)/[[...route]]/_components/icons'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils'

const CreateProjectAlert = (props: {
  showCreateAlert: boolean
  setShowCreateAlert: Function
  input: string
  setInput: Function
}) => {
  const { showCreateAlert, setShowCreateAlert, input, setInput } = props

  const [isCreateLoading, setIsCreateLoading] = React.useState<boolean>(false)

  return (
    <AlertDialog
      open={showCreateAlert}
      onOpenChange={() => {
        setInput('')
        setShowCreateAlert(false)
      }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Add a New Project
            <Input
              className='py-6'
              type='text'
              onChange={e => {
                setInput(e.target.value)
              }}
              value={input}
              placeholder='Enter project name'
              required={true}
              autoFocus
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter your new project name here. Click create when done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async event => {
              event.preventDefault()
              setIsCreateLoading(true)
            }}
            className={cn(buttonVariants({ variant: 'default' }), {
              'cursor-not-allowed opacity-60': isCreateLoading,
            })}
            disabled={isCreateLoading}>
            {isCreateLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.add className='mr-2 h-4 w-4' />
            )}
            <span>Create</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateProjectAlert
