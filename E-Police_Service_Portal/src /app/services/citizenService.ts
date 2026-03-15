import api from "./api";

export const getCitizenProfile = async (id: string) => {
  const response = await api.get(`/citizens/${id}`);
  return response.data;
};

export const submitComplaint = async (complaintData: any) => {
  const response = await api.post("/complaints", complaintData);
  return response.data;
};

export const getCitizenComplaints = async (citizenId: string) => {
  const response = await api.get(`/complaints/citizen/${citizenId}`);
  return response.data;
};
