import React from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = z.object({
    firstName: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    middleName: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    lastName: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    matricNumber: z.string().min(10),
    email: z.string().email(),
    phone: z.string().min(11, { message: "Phone number must be 11 digits" }).max(15),
    isAWorker: z.boolean()
})

const AddMemberForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            matricNumber: "",
            email: "",
            phone: "",
            isAWorker: false
        }
    })

    const onSubmit = (values) => {
        console.log(values)
    }

    const formFields = ["firstName", "lastName", "middleName"]


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <ScrollArea className="h-[60vh] w-full">
                    <div className=' p-4 space-y-8'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <Input placeholder="First Name" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="middleName"
                            render={({ field }) => (
                                <FormItem>
                                    <Input placeholder="Middle Name" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <Input placeholder="Last Name" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="matricNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <Input placeholder="Matric Number" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Input placeholder="Email" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isAWorker"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Is a worker</FormLabel>
                                    <Input type={"checkbox"} {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </ScrollArea>
                <Button type="submit" className="float-right">Add Member</Button>
            </form>
        </Form>
    )
}

export default AddMemberForm
