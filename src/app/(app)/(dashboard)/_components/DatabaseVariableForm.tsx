'use client'

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

const DatabaseVariableForm = ({ projectId }: { projectId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DATABASE_URI: '',
    },
  })

  const { data: ProjectEnv } = trpc.vercel.GetEnvVarsByProjectNameOrId.useQuery(
    {
      projectNameOrId: projectId,
    },
  )

  const getEnvVarId = (key: string) => {
    const filterData = ProjectEnv.envs.filter((env: any) => env.key === key)
    return filterData[0].id
  }

  const { mutate: EditEnvVarByIdAndProjectNameOrId } =
    trpc.vercel.EditEnvVarByIdAndProjectNameOrId.useMutation({
      onSuccess: async () => {
        toast.success('Env variable updated successfully')
      },
      onError: async () => {
        toast.error('Error updating environment variable')
      },
    })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const keys = Object.keys(values)

    const id = getEnvVarId(keys[0])

    EditEnvVarByIdAndProjectNameOrId({
      projectNameOrId: projectId,
      key: keys[0],
      value: values.DATABASE_URI,
      type: 'encrypted',
      target: ['development', 'preview', 'production'],
      envVarId: id,
    })
    console.log(id)
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
                <Input placeholder='mongo database url' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default DatabaseVariableForm
