// src/pages/auth/ResetPassword.jsx
import AuthLayout from '@/layouts/AuthLayout';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const schema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
});

const formFieldsConfig = [
    { name: 'password', label: 'New Password', placeholder: 'Enter your new password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Re-enter your new password', type: 'password' },
]


const ResetPassword = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const password = form.watch('password');
    const confirmPassword = form.watch('confirmPassword');

    const onSubmit = (values) => {
        console.log(values);
        // Handle password reset logic here
    };

    return (
        <AuthLayout>
            <div className='flex flex-col space-y-6'>
                <h1 className='text-2xl text-center font-semibold bg-gradient-to-b from-foreground/40 via-foreground/60 to-foreground/80 bg-clip-text text-transparent'>
                    Reset Password
                </h1>
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
                        <Button disabled={!password || !confirmPassword} className='w-full'>
                            Reset Password
                        </Button>
                        <h1 className='flex gap-2 text-sm font-medium justify-center'>
                            Remember your password?
                            <Link to='/auth/login' className='text-primary hover:underline'>
                                Login
                            </Link>
                        </h1>
                    </form>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
