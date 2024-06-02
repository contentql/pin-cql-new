import { zodResolver } from '@hookform/resolvers/zod'
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

// Define the schema using Zod
const FormSchema = z.object({
  Project_Name: z.string().min(1, { message: 'Project Name is required' }),
  DATABASE_URI: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_REGION: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_SENDER_EMAIL: z.string().optional(),
  RESEND_SENDER_NAME: z.string().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  OPENAPI_KEY: z.string().optional(),
})

// Type definition for the form fields
type FormSchemaType = z.infer<typeof FormSchema>

const VariablesForm = ({
  handleAddProject,
  setServiceVariable,
  isTemplateDeploying,
  setIsDialogOpen,
}: any) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Project_Name: '',
      DATABASE_URI: '',
      S3_ENDPOINT: '',
      S3_ACCESS_KEY_ID: '',
      S3_SECRET_ACCESS_KEY: '',
      S3_BUCKET: '',
      S3_REGION: '',
      RESEND_API_KEY: '',
      RESEND_SENDER_EMAIL: '',
      RESEND_SENDER_NAME: '',
      AUTH_GITHUB_ID: '',
      AUTH_GITHUB_SECRET: '',
      OPENAPI_KEY: '',
    },
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    setServiceVariable(data)
    handleAddProject(data)
  }

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
          <div className='fixed bottom-0 left-0 flex  w-full justify-center gap-2 bg-white p-4'>
            {' '}
            {/* Fixed button container */}
            <Button disabled={isTemplateDeploying} type='submit'>
              Submit
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
    </div>
  )
}

export default VariablesForm
