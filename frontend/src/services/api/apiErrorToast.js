import { useToast } from "@/hooks/use-toast"


const apiErrorToast = (error) => {
    const { toast } = useToast()
    const errorMessage = error.response?.data?.message
    console.log(error)
    alert(errorMessage)
    toast({
        variant: "destructive",
        title: "An error occured.",
        description: errorMessage,
      })
}

export default apiErrorToast