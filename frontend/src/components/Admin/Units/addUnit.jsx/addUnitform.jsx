import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useCreateUnitMutation } from '@/dataOperations/unit'
import Loader from '@/components/Loader'

// Modal component
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <h2 className='text-xl font-semibold text-center'>{message}</h2>
        <div className='flex justify-center mt-4'>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

const schema = z.object({
  title: z.string().min(2, 'Unit name is required'),
})

const AddUnitForm = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '' },
  })

  const mutation = useCreateUnitMutation()

  if (!mutation) {
    return <p className='text-red-500'>Authentication required. Please log in.</p>
  }

  const { mutate, isPending } = mutation

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(true)
        form.reset()
        refetch?.()
      },
    })
  }

  return (
    <div className='relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Name</FormLabel>
                <Input placeholder='e.g. Drama' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isPending}>
            {isPending ? <Loader /> : 'Create Unit'}
          </Button>
        </form>
      </Form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message='Unit added successfully!'
      />
    </div>
  )
}

export default AddUnitForm
