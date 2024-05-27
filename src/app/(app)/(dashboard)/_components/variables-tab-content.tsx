import { projects } from '../_data'
import { Check, Copy, EllipsisVertical, Eye, EyeOff, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { Input } from '~/src/components/ui/input'

interface VariablesTabContentProps {
  variables: (typeof projects)[0]['services'][0]['variables']
  environmentId: string
  templateVariablesUpdate: any
}

const VariablesTabContent: React.FC<VariablesTabContentProps> = ({
  variables,
  environmentId,
  templateVariablesUpdate,
}) => {
  const params = useParams()

  const projectId = params.projectId?.toString()
  const serviceId = params.serviceId?.toString()
  const [copied, setCopied] = useState<Record<string, boolean>>({})
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    Object.keys(variables || {}).reduce(
      (acc, key) => {
        acc[key] = false
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )
  const [edit, setEdit] = useState<Record<string, undefined | string>>(
    Object.keys(variables || {}).reduce(
      (acc, key) => {
        acc[key] = undefined
        return acc
      },
      {} as Record<string, undefined | string>,
    ),
  )

  const toggleVisibility = (key: string) => {
    setVisibility(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const toggleUpdate = (key: string, value: string) => {
    console.log('Toggling edit')
    templateVariablesUpdate({
      input: {
        environmentId: environmentId,
        serviceId: serviceId,
        projectId: projectId,
        variables: {
          [key]: value,
        },
      },
    })
  }

  const toggleEdit = (key: string, value: string) => {
    setEdit(prevState => ({
      ...prevState,
      [key]: prevState[key] ? undefined : value,
    }))
  }

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value || 'empty data!').catch(error => {
      console.error('Error copying object to clipboard:', error)
    })

    setCopied(prevState => ({
      ...prevState,
      [key]: true,
    }))

    // Reset the copied status after a delay
    setTimeout(() => {
      setCopied(prevState => ({
        ...prevState,
        [key]: false,
      }))
    }, 1300)
  }

  console.log(edit)

  return (
    <Table>
      <TableBody>
        {variables &&
          Object.entries(variables).map(([key, value]) => (
            <TableRow key={key} className='rounded-md group'>
              <TableCell className='w-[30%]'>{key}</TableCell>
              <TableCell className='w-[60%]'>
                {edit[key] ? (
                  <div className='flex items-center gap-2'>
                    <Input
                      type='text'
                      placeholder='Value'
                      value={edit[key]}
                      className='py-1 h-fit focus-visible:ring-0 focus-visible:ring-offset-0 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0'
                      onChange={e => {
                        setEdit({
                          [key]: e.target.value,
                        })
                      }}
                    />
                    <X
                      className='h-5 w-5 ml-4 cursor-pointer'
                      onClick={() => toggleEdit(key, value)}
                    />
                    <Check
                      className='h-5 w-5 ml-4 cursor-pointer'
                      onClick={() => toggleUpdate(key, edit[key]!)}
                    />
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    {visibility[key] ? (
                      <>
                        <p>{value}</p>
                        <EyeOff
                          className={`h-4 w-4 ml-2 cursor-pointer ${!visibility[key] && 'hidden'} group-hover:block`}
                          onClick={() => toggleVisibility(key)}
                        />
                      </>
                    ) : (
                      <>
                        <p>********</p>
                        <Eye
                          className={`h-4 w-4 ml-2 cursor-pointer ${!visibility[key] && 'hidden'} group-hover:block`}
                          onClick={() => toggleVisibility(key)}
                        />
                      </>
                    )}
                    {copied[key] ? (
                      <Check
                        className={`h-4 w-4 ml-2 transition-all duration-300 ease-in-out text-green-600 ${!copied[key] && 'hidden'} group-hover:block`}
                      />
                    ) : (
                      <Copy
                        className={`h-4 w-4 ml-2 transition-all duration-300 ease-in-out cursor-pointer ${!copied[key] && 'hidden'} group-hover:block`}
                        onClick={() => handleCopy(key, value)}
                      />
                    )}
                  </div>
                )}
              </TableCell>
              <TableCell className='w-[10%] text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup='true' size='icon' variant='ghost'>
                      <EllipsisVertical className='h-4 w-4' />
                      <span className='sr-only'>Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => toggleEdit(key, value)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default VariablesTabContent
