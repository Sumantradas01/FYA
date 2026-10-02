import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getFindings = async () => {
  const response = await api.get("/findings");
  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

export const getReport = async (id: string | number) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

export const analyzeRepository = async (repoUrl: string) => {
  const response = await api.post("/analyze", {
    repo_url: repoUrl
  });

  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/analytics");
  return response.data;
};