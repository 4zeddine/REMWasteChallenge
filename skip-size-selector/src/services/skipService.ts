import axios from "axios";
import type { Skip } from "../types/skip";

const API_BASE_URL =
  "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export class SkipService {
  static async getSkipsByLocation(): Promise<Skip[]> {
    try {
      const response = await apiClient.get<Skip[]>("");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching skips:", error);
      return [];
    }
  }
}
