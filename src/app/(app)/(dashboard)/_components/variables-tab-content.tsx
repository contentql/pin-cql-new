import { projects } from '../_data'
import { Copy, EllipsisVertical, Eye, EyeOff } from 'lucide-react'
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

interface VariablesTabContentProps {
  variables: (typeof projects)[0]['services'][0]['variables']
}

const VariablesTabContent: React.FC<VariablesTabContentProps> = ({
  variables,
}) => {
  const [visibility, setVisibility] = useState(
    variables &&
      Object.keys(variables).reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {}),
  )

  const toggleVisibility = key => {
    setVisibility(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  return (
    <Table>
      <TableBody>
        {variables &&
          Object.entries(variables).map(([key, value]) => (
            <TableRow key={key} className='rounded-md'>
              <TableCell className='w-[30%]'>{key}</TableCell>
              <TableCell className='w-[60%]'>
                <div className='flex gap-2'>
                  {visibility[key] ? (
                    <>
                      <p>{value}</p>
                      <EyeOff
                        className='h-4 w-4 ml-2 cursor-pointer'
                        onClick={() => toggleVisibility(key)}
                      />
                    </>
                  ) : (
                    <>
                      <p>********</p>
                      <Eye
                        className='h-4 w-4 ml-2 cursor-pointer'
                        onClick={() => toggleVisibility(key)}
                      />
                    </>
                  )}
                  <Copy className='h-4 w-4 ml-2 cursor-pointer' />
                </div>
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
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
