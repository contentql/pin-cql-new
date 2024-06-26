'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import { toast } from '@/components/ui/use-toast'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/src/components/ui/select'

const steps = [{ label: 'Name' }, { label: 'Region' }]

export default function VariablesForm({
  handleAddProject,
  isTemplateDeploying,
  setIsDialogOpen,
  messages,
}: any) {
  const [formData, setFormData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const FirstStepForm = () => {
    const { nextStep } = useStepper()

    const form = useForm<z.infer<typeof FirstFormSchema>>({
      resolver: zodResolver(FirstFormSchema),
      defaultValues: {
        projectName: '',
      },
    })

    function onSubmit(_data: z.infer<typeof FirstFormSchema>) {
      nextStep()
      const Project_Name = _data.projectName
      setFormData(prev => ({ ...prev, Project_Name }))
      toast({
        title: 'First step submitted!',
      })
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='projectName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder='Project name' {...field} />
                </FormControl>
                <FormDescription>Enter your project name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <StepperFormActions />
        </form>
      </Form>
    )
  }

  const SecondStepForm = () => {
    const { nextStep } = useStepper()

    const form = useForm<z.infer<typeof SecondFormSchema>>({
      resolver: zodResolver(SecondFormSchema),
      defaultValues: {
        region: '',
      },
    })

    function onSubmit(_data: z.infer<typeof SecondFormSchema>) {
      nextStep()
      const serverlessFunctionRegion = _data.region
      setFormData(prev => ({ ...prev, serverlessFunctionRegion }))
      toast({
        title: 'Second step submitted!',
      })
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='region'
            render={({ field }) => (
              <FormItem>
                <FormLabel>region</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a region' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='arn1'>Stockholm, Sweden</SelectItem>
                    <SelectItem value='bom1'>Mumbai, India</SelectItem>
                    <SelectItem value='cdg1'>Paris, France</SelectItem>
                    <SelectItem value='cle1'>Cleveland, USA</SelectItem>
                    <SelectItem value='cpt1'>
                      Cape Town, South Africa
                    </SelectItem>
                    <SelectItem value='dub1'>Dublin, Ireland</SelectItem>
                    <SelectItem value='fra1'>Frankfurt, Germany</SelectItem>
                    <SelectItem value='gru1'>São Paulo, Brazil</SelectItem>
                    <SelectItem value='hkg1'>Hong Kong</SelectItem>
                    <SelectItem value='hnd1'>Tokyo, Japan</SelectItem>
                    <SelectItem value='iad1'>Washington, D.C., USA</SelectItem>
                    <SelectItem value='icn1	'>Seoul, South Korea</SelectItem>
                    <SelectItem value='kix1'>Osaka, Japan</SelectItem>
                    <SelectItem value='lhr1	'>London, United Kingdom</SelectItem>
                    <SelectItem value='pdx1'>Portland, USA</SelectItem>
                    <SelectItem value='sfo1'>San Francisco, USA</SelectItem>
                    <SelectItem value='sin1	'>Singapore</SelectItem>
                    <SelectItem value='syd1'>Sydney, Australia</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <StepperFormActions />
        </form>
      </Form>
    )
  }

  const handleSubmit = async () => {
    setIsOpen(true)
    try {
      await handleAddProject(formData)
    } catch (error) {
      console.log('error', error)
    }
  }

  const MyStepperFooter = () => {
    const { activeStep, resetSteps, steps } = useStepper()

    if (activeStep !== steps.length) {
      return null
    }

    return (
      <div className='flex items-center justify-end gap-2'>
        <Button variant='outline' onClick={resetSteps}>
          cancel
        </Button>
        <Button onClick={() => handleSubmit()}>submit</Button>
      </div>
    )
  }

  return (
    <div>
      {isOpen ? (
        <div>
          <div className='mt-4 flex items-center justify-center'>
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
            <div>Please wait processing...</div>
          </div>
          <div className='mt-4'>
            {messages.map((message: any) => (
              <div key={message.event}>
                {message.event.includes('Error') ? (
                  <div className='flex items-center gap-2 p-2'>
                    <AlertCircle color='red' />
                    <p>{message.event}</p>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 p-2'>
                    <CheckCheck color='green' />
                    <p>{message.event}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className='flex w-full flex-col gap-4'>
            <Stepper variant='circle-alt' initialStep={0} steps={steps}>
              {steps.map((stepProps, index) => {
                if (index === 0) {
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <FirstStepForm />
                    </Step>
                  )
                }
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <SecondStepForm />
                  </Step>
                )
              })}
              <MyStepperFooter />
            </Stepper>
          </div>
        </div>
      )}
    </div>
  )
}

const FirstFormSchema = z.object({
  projectName: z.string().min(2, {
    message: 'Project name must be at least 2 characters.',
  }),
})

const SecondFormSchema = z.object({
  region: z.string(),
})

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper()

  return (
    <div className='flex w-full justify-end gap-2'>
      {hasCompletedAllSteps ? (
        <Button size='sm' type='button' onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size='sm'
            variant='secondary'
            type='button'>
            Prev
          </Button>
          <Button size='sm' type='submit'>
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </>
      )}
    </div>
  )
}
