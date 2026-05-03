"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export const useRestoreEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.put(`/employees/restore/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["deletedEmployees"]);
      queryClient.invalidateQueries(["employees"]);
    },
  });
};
