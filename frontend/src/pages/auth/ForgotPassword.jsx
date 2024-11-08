import AuthLayout from '@/layouts/AuthLayout'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'

const schema = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
})

const ForgotPassword = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
    })

    const email = form.watch("email")

    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <AuthLayout>
            <div className='flex flex-col space-y-6'>
                <h1 className='text-2xl text-center font-semibold bg-gradient-to-b from-foreground/40 via-foreground/60 to-foreground/80 bg-clip-text text-transparent '>
                    Forgot Password
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>

                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground/80">Email</FormLabel>
                                    <Input placeholder={"e.g name@gmail.com"} {...field} />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <Button disabled={!email} className="w-full">
                            Check Email
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthLayout>
    )
}

export default ForgotPassword
