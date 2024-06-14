import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { trpc } from '@/trpc/client'

const formSchema = z.object({
  DATABASE_URI: z.string().min(2),
})

const DatabaseVariableForm = ({
  projectId,
  getEnvVarId,
}: {
  projectId: string
  getEnvVarId: any
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DATABASE_URI: '',
    },
  })

  const { mutateAsync: EditEnvVarByIdAndProjectNameOrId } =
    trpc.vercel.EditEnvVarByIdAndProjectNameOrId.useMutation({
      onSuccess: async () => {
        toast.success('Env variable updated successfully')
      },
      onError: async () => {
        toast.error('Error updating environment variable')
      },
    })

  const { mutateAsync: updateProjectEnvVariables } =
    trpc.projects.updateProjectEnvVariables.useMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const keys = Object.keys(values)

    const id = getEnvVarId(keys[0])

    console.log(values)

    await EditEnvVarByIdAndProjectNameOrId({
      projectNameOrId: projectId,
      key: keys[0],
      value: values.DATABASE_URI,
      type: 'encrypted',
      target: ['development', 'preview', 'production'],
      envVarId: id,
    }).then(() => {
      updateProjectEnvVariables({
        id: projectId,
        key: keys[0],
        value: values.DATABASE_URI,
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='DATABASE_URI'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Database URL</FormLabel>
              <FormControl>
                <Input
                  className='w-full'
                  placeholder='mongo database url'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Save</Button>
      </form>
    </Form>
  )
}

export default DatabaseVariableForm
