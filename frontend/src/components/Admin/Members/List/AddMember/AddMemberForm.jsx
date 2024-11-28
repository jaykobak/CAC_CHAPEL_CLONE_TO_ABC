import React from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCreateMemberMutation, useEditMemberMutation } from "@/dataOperations/members"
import { useGetUnitsQuery } from "@/dataOperations/unit"
import Loader from "@/components/Loader"

const levels = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "JUPEB", "PRE DEGREE", "Parents", "Children", "Alumni"]


const formSchema = z.object({
    firstname: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    lastname: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    // matricNumber: z.string().min(10, { message: "Matric Number must be at least 10 characters" }).optional(),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(11, { message: "Phone number must be 11 digits" }).max(15),
    isAWorker: z.boolean(),
    unit: z.string().optional(),
    level: z.enum(levels)
}).superRefine((data, ctx) => {
    if (data.isAWorker && !data.unit) {
      ctx.addIssue({
        path: ["unit"],
        message: "Unit is required if user is a worker",
      });
    }
  });

// Form configuration for easier looping
const formFieldsConfig = [
    { name: "firstname", placeholder: "First Name", type: "text" },
    { name: "lastname", placeholder: "Last Name", type: "text" },
    // { name: "matricNumber", placeholder: "Matric Number", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "phone", placeholder: "Phone Number", type: "number" }
]

const AddMemberForm = ({ memberData }) => {
    const { data,  } = useGetUnitsQuery()
    
    const { mutate, isPending } = useCreateMemberMutation()
    const { mutate: editMutate, isPending: editIsPending } = useEditMemberMutation(memberData?._id)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: memberData ? memberData?.firstname : "",
            lastname: memberData ? memberData?.lastname : "",
            matricNumber: memberData ? memberData?.matricNumber : "",
            email: memberData ? memberData?.email : "",
            phone: memberData ? memberData?.phone : "",
            isAWorker: (memberData && memberData?.unit != []) ? true : false,
            level: memberData ? memberData?.level : "100 Level",
            unit: memberData ? memberData?.unit[0] : null,
        }
    })

    const onSubmit = (values) => {
        console.log(values)
        memberData ? editMutate(values) : mutate(values) 
    }

    const pending = isPending || editIsPending 

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className="custom-scroll-area max-h-[50vh] h-fit w-full ">
                    <div className='p-4 space-y-8'>

                        {/* Dynamically render input fields */}
                        {formFieldsConfig.map((formField) => (
                            <FormField
                                key={formField.name}
                                control={form.control}
                                name={formField.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input placeholder={formField.placeholder} {...field} type={formField.type} />
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {/* Level Select Field */}
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" defaultValue={field.value}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level} value={level}>{level}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Worker Checkbox */}
                        <FormField
                            control={form.control}
                            name="isAWorker"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        <FormLabel>Is a Worker</FormLabel>
                                    </div>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Conditionally Render Unit Field if isAWorker is checked */}
                        {form.watch("isAWorker") && (
                            <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select unit" defaultValue={field.value} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {data?.data.map((unit) => (
                                                    <SelectItem key={unit._id} value={unit._id}>{unit.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </div>
                <Button type="submit" className="float-right">
                    {pending? <Loader className={"border-primary-foreground"} /> : "Submit"}
                </Button>
            </form>
        </Form>
    )
}

export default AddMemberForm
