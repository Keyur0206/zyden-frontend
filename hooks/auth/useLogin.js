import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";

export const useAdminLogin = () => {
  return useMutation({
    mutationKey: ["adminLogin"],

    mutationFn: async (payload) => {
      const response = await api.post("/auth/login", payload);
      return response.data;
    },
  });
};
