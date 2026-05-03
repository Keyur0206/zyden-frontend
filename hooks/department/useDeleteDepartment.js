import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-department"],

    mutationFn: async (id) => {
      const res = await api.delete(`/departments/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
