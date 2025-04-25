import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/services/api/apiEndpoints";
import apiErrorToast from "@/services/api/apiErrorToast";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/authStore";

export const useLoginMutation = () => {
    const navigate = useNavigate()
    const { toast } = useToast() 
    const setAuth = useAuthStore(state => state.setAuth)
    return useMutation({
        mutationFn: (data) => loginUser(data),
        onSuccess: (data) => {
            setAuth(data.accessToken)
            navigate("/admin/dashboard")
            toast({
                title: "Success",
                description: data.message,
            })
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "An error occurred.",
                description: error.response.data.message,
            })
        },
    })
}

export const useRegisterMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: (data) => {
            // navigate("/admin/dashboard")
            alert(data.message)
        },
        onError: (error) => {
            
        },
    })
}

