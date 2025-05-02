import AuthLayout from '@/layouts/AuthLayout'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { useRegisterMutation } from '@/dataOperations/auth'

const schema = z.object({
    firstname: z.string().min(3, { message: "First name cannot be empty" }),
    lastname: z.string().min(3, { message: "Last name cannot be empty" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            message: "Passwords must match",
        });
    }
})

const formFieldsConfig = [
    { name: "firstname", label: "First Name", placeholder: "John", type: "text" },
    { name: "lastname", label: "Last Name", placeholder: "Doe", type: "text" },
    { name: "email", label: "Email", placeholder: "e.g name@gmail.com", type: "text" },
    { name: "password", label: "Password", placeholder: "Enter your password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter your password", type: "password" },
]

const Register = () => {
    const { mutate } = useRegisterMutation()
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
        mutate(values)
    }

    return (
        <AuthLayout>
            <div className='flex flex-col space-y-6'>
                <h1 className='text-2xl text-center font-semibold bg-gradient-to-b from-foreground/40 via-foreground/60 to-foreground/80 bg-clip-text text-transparent '>Create A New Account</h1>
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


                        <Button disabled={!email || !password} className="w-full">
                            Register
                        </Button>

                        <h1 className='flex gap-2 text-sm font-medium justify-center flex-wrap text-nowrap'>
                            Do you want to create a new account?
                            <Link to="/login" className='text-primary hover:underline'>
                                Login
                            </Link>
                        </h1>



                    </form>
                </Form>
            </div>
        </AuthLayout>
    )
}

export default Register


