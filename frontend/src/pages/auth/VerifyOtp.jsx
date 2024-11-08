import AuthLayout from '@/layouts/AuthLayout'
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const schema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const VerifyOtp = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            otp: '',
        },
    })

    const otp = form.watch("otp")

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
                            name={"otp"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password sent to your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={!otp} className="w-full">
                            Verify
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthLayout>
    )
}

export default VerifyOtp
