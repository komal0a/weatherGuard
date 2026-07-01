import { useAuth } from "@clerk/clerk-react";
import { api } from "../services/api";

export function useApi() {
  const { getToken } = useAuth();

  async function authConfig() {
    const token = await getToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    get: async (url: string) => api.get(url, await authConfig()),

    post: async (url: string, data?: unknown) =>
      api.post(url, data, await authConfig()),

    patch: async (url: string, data?: unknown) =>
      api.patch(url, data, await authConfig()),
  };
}
