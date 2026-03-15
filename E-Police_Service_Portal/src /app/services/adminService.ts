import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/admin/reports");
  return response.data;
};