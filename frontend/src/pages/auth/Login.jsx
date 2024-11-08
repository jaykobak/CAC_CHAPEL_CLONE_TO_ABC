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
    email: z.string(),
    password: z.string()
})

const formFieldsConfig = [
    { name: "email", label: "Email", placeholder: "e.g name@gmail.com", type: "text" },
    { name: "password", label: "Password", placeholder: "Enter your password", type: "text" },
]

const Login = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const email = form.watch("email")
    const password = form.watch("password")

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <AuthLayout>
            <div className='flex flex-col space-y-6'>
                <h1 className='text-xl text-center font-medium text-primary '>Welcome Back</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                        {formFieldsConfig.map((formField) => (
                            <FormField
                                key={formField.name}
                                control={form.control}
                                name={formField.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground/80">{formField.label}</FormLabel>
                                        <Input placeholder={formField.placeholder} {...field} type={field.type} className="bg-transparent" />
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <h1 className='-mt-5 text-xs text-primary font-semibold'>
                            <Link to="/auth/forgot-password">
                                Forgot Password?
                            </Link>
                        </h1>


                        <Button disabled={!email || !password} className="w-full">
                            Login
                        </Button>

                        <h1 className='flex gap-2 text-sm font-medium justify-center flex-wrap text-nowrap'>
                            Do you want to create a new account?
                            <Link to="/auth/register" className='text-primary hover:underline'>
                                Register
                            </Link>
                        </h1>

                    </form>
                </Form>
            </div>
        </AuthLayout>
    )
}

export default Login
