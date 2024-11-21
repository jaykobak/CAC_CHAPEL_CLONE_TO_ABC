import { useMutation, useQuery } from "@tanstack/react-query";
import { getTotalMembersAnalytics, getUnits } from "@/services/api/apiEndpoints";
import apiErrorToast from "@/services/api/apiErrorToast";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/authStore";


export const useGetTotalMembersAnalytics = () => {
    return useQuery({
        queryKey: ["total-members-analytics"],
        queryFn: getTotalMembersAnalytics,
    });
}
