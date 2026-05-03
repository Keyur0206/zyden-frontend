import api from "../../services/api";

import { useMutation } from "@tanstack/react-query";

export const useAdminRegister = () => {
  return useMutation({
    mutationKey: ["adminRegister"],

    mutationFn: async (payload) => {
      const response = await api.post("/auth/register", payload);
      return response.data;
    },
  });
};
