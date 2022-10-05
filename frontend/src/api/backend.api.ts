import axios, { AxiosInstance } from "axios";

export class BackendApi {
  private client: AxiosInstance;

  constructor(private baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken: string) {
    console.log("setAccessToken");
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
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

  async getUsers() {
    console.log("getUsers");
    try {
      const res = await this.client.get<any>("/users");
      return res.data;
    } catch (error) {
      console.error("Failed to get users", error);
      throw error;
    }
  }
}

export interface GetConfigResponse {
  androidDownloadUrl: string;
}
