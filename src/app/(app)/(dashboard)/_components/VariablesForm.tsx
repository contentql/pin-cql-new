import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  Project_Name: z.string().min(1, { message: 'Project Name is required' }),
})

type FormSchemaType = z.infer<typeof FormSchema>

const VariablesForm = ({
  handleAddProject,
  setServiceVariable,
  isTemplateDeploying,
  setIsDialogOpen,
  messages,
  setMessages,
}: any) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Project_Name: '',
    },
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    setIsLoading(true)
    setServiceVariable(data)
    setMessages([])
    try {
      await handleAddProject(data, setMessages)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  console.log(messages)

  return (
    <div className='max-h-96 max-w-7xl overflow-y-auto pb-16 pt-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {Object.keys(form.control._defaultValues).map(key => (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof FormSchemaType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{key.replace(/_/g, ' ')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={key}
                      className='mx-2 max-w-96'
                      {...field}
                      type={
                        key.toLowerCase().includes('password')
                          ? 'password'
                          : 'text'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className='fixed bottom-0 left-0 flex w-full justify-center gap-2 bg-white p-4'>
            <Button disabled={isTemplateDeploying} type='submit'>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              variant='outline'
              disabled={isTemplateDeploying}
              onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </form>
      </Form>
      <div className='mt-4'>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <svg
              className='mr-2 h-5 w-5 animate-spin text-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v8H4z'></path>
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          <p className='text-center text-green-500'>{messages}</p>
        )}
      </div>
    </div>
  )
}

export default VariablesForm
