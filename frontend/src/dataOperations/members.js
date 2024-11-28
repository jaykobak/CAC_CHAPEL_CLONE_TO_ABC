import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMember, deleteMember, getMembers } from "@/services/api/apiEndpoints";
import apiErrorToast from "@/services/api/apiErrorToast";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/authStore";


export const useCreateMemberMutation = () => {
    const { toast } = useToast() 
    return useMutation({
        mutationFn: (data) => createMember(data),
        onSuccess: (data) => {
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

export const useEditMemberMutation = () => {
    const { toast } = useToast()
    return useMutation({
        mutationFn: (data) => updateMember(data),
        onSuccess: (data) => {
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
        onSettled: () => {
            queryClient.invalidateQueries(['members']); // Ensure cache is synced
        },
    })
}

export const useDeleteMemberMutation = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: (id) => deleteMember(id),
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Member deleted successfully",
            })
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "An error occurred.",
                description: error.response.data.message,
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries(['members']); // Ensure cache is synced
        },
    })
}

export const useGetMembersQuery = () => {
    return useQuery({
        queryKey: ["members"],
        queryFn: getMembers
    })
}