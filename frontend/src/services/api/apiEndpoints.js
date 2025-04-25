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

export const getMember = async () => {
  const response = await apiClient.get(`/member/${id}`)
  return response.data;
};


export const createMember = async (data) => {
  const response = await apiClient.post("/member", data)
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await apiClient.delete(`/member/${id}`)
  return response.data;
};

export const editMember = async (data, id) => {
  const response = await apiClient.put(`/member/${id}`, data)
  return response.data;
};

export const getUnits = async () => {
  const response = await apiClient.get("/user/unit")
  return response.data;
};

export const getTotalMembersAnalytics = async () => {
  const response = await apiClient.get("/user/analytics")
  return response.data;
};

// sermons 

export const createSermon = async (data) => {
  const response = await apiClient.post("/user/sermon/create-sermon", data)
  return response.data;
};

export const getSermons = async () => {
  const response = await apiClient.get("/user/sermon/get-sermons",)
  return response.data;
};

export const editSermon = async (data, sermonId) => {
  const response = await apiClient.put(`/user/sermon/update-sermon/${sermonId}`, data)
  return response.data;
};

export const deleteSermon = async (sermonId) => {
  const response = await apiClient.delete(`/user/sermon/delete-sermon/${sermonId}`)
  return response.data;
};
