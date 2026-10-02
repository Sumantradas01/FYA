export interface PowerBIConfig {
  embedUrl: string;
  accessToken: string;
  reportId: string;
}

export const getPowerBIConfig = async (): Promise<PowerBIConfig> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/powerbi/config`
  );

  if (!response.ok) {
    throw new Error("Unable to load Power BI configuration");
  }

  return response.json();
};