import { useMutation, useQuery } from "@tanstack/react-query";
import { getUnits, createUnit } from "@/services/api/apiEndpoints"; // make sure createUnit exists
import apiErrorToast from "@/services/api/apiErrorToast";


// ✅ Fetch Units
export const useGetUnitsQuery = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      try {
        const response = await getUnits();
        return response.data;  // assuming your API returns { data: [...] }
      } catch (error) {
        apiErrorToast(error);
        throw error;
      }
    },
  });
};

// ✅ Create New Unit
export const useCreateUnitMutation = () => {
  return useMutation({
    mutationFn: async (newUnitData) => {
      try {
        const response = await createUnit(newUnitData);
        return response.data;
      } catch (error) {
        apiErrorToast(error);
        throw error;
      }
    },
  });
};
