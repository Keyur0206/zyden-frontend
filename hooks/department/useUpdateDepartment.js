import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-department"],

    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/departments/${id}`, payload);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
