"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export const usePermanentDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/employees/permanent/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["deletedEmployees"]);
    },
  });
};
