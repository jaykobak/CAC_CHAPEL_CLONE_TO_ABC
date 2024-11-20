import apiClient from "./apiClient";
import { useToast } from "@/hooks/use-toast";


export const loginUser = async (data) => {
  const response = await apiClient.post("/user/login", data)
  return response.data;
};

export const registerUser = async (data) => {
  const response = await apiClient.post("/user/register", data)
  return response.data;
};

export const getMembers = async () => {
  const response = await apiClient.get("/member")
  return response.data;
};

export const createMember = async (data) => {
  const response = await apiClient.post("/member", data)
  return response.data;
};


