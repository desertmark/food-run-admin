export interface BackendConfig {
  apiUrl: string;
}
export const backendConfig = {
  apiUrl: process.env.REACT_APP_API_URL || "",
};
