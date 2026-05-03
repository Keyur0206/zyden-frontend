"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export const useGetDeletedEmployees = () => {
  return useQuery({
    queryKey: ["deletedEmployees"],

    queryFn: async () => {
      const res = await api.get("/employees/deleted");
      return res.data;
    },
  });
};
