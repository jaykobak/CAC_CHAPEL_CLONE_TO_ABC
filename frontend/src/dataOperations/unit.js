import { useMutation, useQuery } from "@tanstack/react-query";
import { getUnits } from "@/services/api/apiEndpoints";
import apiErrorToast from "@/services/api/apiErrorToast";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/authStore";


export const useGetUnitsQuery = () => {
    return useQuery({
        queryKey: ["units"],
        queryFn: getUnits,
    });
}
