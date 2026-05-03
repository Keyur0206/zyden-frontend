import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateEmployee"],

    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/employees/${id}`, payload);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
