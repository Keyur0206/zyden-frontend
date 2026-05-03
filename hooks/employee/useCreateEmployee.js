import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createEmployee"],

    mutationFn: async (payload) => {
      const res = await api.post("/employees", payload);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
