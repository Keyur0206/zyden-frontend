import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-department"],

    mutationFn: async (payload) => {
      const res = await api.post("/departments", payload);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
