import axios, { AxiosInstance } from "axios";

export class BackendApi {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  }
  async getConfig() {
    try {
      const res = await this.client.get<GetConfigResponse>("/config");
      return res.data;
    } catch (error) {
      console.error("Failed to get configuration", error);
      throw error;
    }
  }
}

export interface GetConfigResponse {
  androidDownloadUrl: string;
}
