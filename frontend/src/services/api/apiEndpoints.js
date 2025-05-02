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

export const getMember = async (memberId) => {
  const response = await apiClient.get(`/member/${memberId}`)
  return response.data;
};


export const searchMember = async (query) => {
  const response = await apiClient.get(`/member/search${query}`,)
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

// Create a new unit
export const createUnit = async (unitData) => {
  const response = await apiClient.post("/user/unit", unitData);
  return response.data;
};

// Delete a single unit
// export const deleteUnit = async (unitId) => {
//   const response = await apiClient.delete(`/user/unit/${unitId}`);
//   return response.data;
// };

export const deleteUnit = async (unitId) => {
  // Add validation here too
  if (!unitId) throw new Error('No unit ID provided');
  const response = await apiClient.delete(`/user/unit/${unitId}`);
  return response.data;
};

// // Delete multiple units
// export const deleteMultipleUnits = async (unitIds) => {
//   const response = await apiClient.delete("/user/units", {
//     data: { ids: unitIds }
//   });
//   return response.data;
// };

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

// library

export const addBook = async (data) => {
  console.log('............................', data)
  const response = await apiClient.post("/user/book/create-book", data)
  return response.data;
};

export const getBooks = async () => {
  const response = await apiClient.get("/user/book/get-books",)
  return response.data;
};

export const getBook = async (bookId) => {
  const response = await apiClient.get(`/user/book/get-book/${bookId}`)
  return response.data;
};

export const editBook = async (bookId, data) => {
  const response = await apiClient.put(`/user/book/update-book/${bookId}`, data)
  return response.data;
};

export const deleteBook = async (bookId) => {
  const response = await apiClient.delete(`/user/book/delete-book/${bookId}`)
  return response.data;
};

// BORROWING

export const borrowBook = async (data) => {
  const response = await apiClient.post("/user/book/borrow-book", data)
  return response.data;
};

export const returnBook = async (data) => {
  const response = await apiClient.post("/user/book/return-book", data)
  return response.data;
};

export const borrowHistory = async () => {
  const response = await apiClient.get("/user/book/borrow-history",)
  return response.data;
};


export const searchBooks = async (query) => {
  const response = await apiClient.get(`/user/book/search${query}`,)
  return response.data;
};

// event
export const createEvent = async (data) => {
  const response = await apiClient.post(`/member/event/`, data)
  return response.data;
};

export const getEvents = async () => {
  const response = await apiClient.get(`/member/event/`,)
  return response.data;
};

export const editEvent = async (data, eventId) => {
  const response = await apiClient.put(`/member/event/${eventId}`, data)
  return response.data;
};

export const createAttendance = async (data) => {
  const response = await apiClient.post(`/member/attendance/${eventId}`, data)
  return response.data;
};

export const getAttendance = async (eventId) => {
  const response = await apiClient.get(`/member/event/${eventId}`,)
  return response.data;
};
