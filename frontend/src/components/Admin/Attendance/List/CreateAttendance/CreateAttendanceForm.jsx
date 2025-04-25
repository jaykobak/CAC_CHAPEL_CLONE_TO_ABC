import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import Loader from "@/components/Loader"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock } from "lucide-react"

const levels = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "JUPEB", "PRE DEGREE", "Parents", "Children", "Alumni"]


const formSchema = z.object({
    name: z.string().min(3, { message: "Attendance name cannot be less than 3 chars" }),
    date: z.date({
        required_error: "Date is required"
    }),
    startTime: z.string(),
    endTime: z.string(),
})

// Form configuration for easier looping
const formFieldsConfig = [
    { name: "name", placeholder: "First Name", type: "text" },
    { name: "dateTime", placeholder: "Last Name", type: "date" },
    { name: "startTime", placeholder: "Email", type: "time" },
    { name: "endTime", placeholder: "Phone Number", type: "time" },
]


const CreateAttendanceForm = ({ attendanceData }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: attendanceData ? attendanceData?.name : "",
            date: attendanceData ? new Date(attendanceData?.date) : new Date(),
            startTime: attendanceData ? attendanceData?.startTime : "",
            endTime: attendanceData ? attendanceData?.endTime : "",
        }
    })

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <Form {...form} id="create-attendance-form">
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className="custom-scroll-area max-h-[70vh] h-fit w-full ">
                    <div className='p-4 space-y-8'>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <Input placeholder={"Name"} {...field} type={"text"} />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date === new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />



                        <div className="flex gap-10">
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>From</FormLabel>
                                        <Input placeholder={"Name"} {...field} type={"time"} className="w-full" />
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>To</FormLabel>
                                        <Input placeholder={"Name"} {...field} type={"time"} className="w-full" />
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                {/* <Button type="submit" className="float-right">
                    Submit
                </Button> */}
            </form>
        </Form>
    )
}

export default CreateAttendanceForm