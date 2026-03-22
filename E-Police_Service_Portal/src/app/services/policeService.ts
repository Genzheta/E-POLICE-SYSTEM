import api from "./api";

export const getAllCases = async () => {
  const response = await api.get("/cases");
  return response.data;
};

export const updateCaseStatus = async (caseId: string, status: string) => {
  const response = await api.put(`/cases/${caseId}`, {
    status,
  });

  return response.data;
};

export const assignOfficer = async (caseId: string, officerId: string) => {
  const response = await api.post(`/cases/${caseId}/assign`, {
    officerId,
  });

  return response.data;
};
