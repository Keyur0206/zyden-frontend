import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useGetEmployees = (params) => {
  return useQuery({
    queryKey: ["employees", params],

    queryFn: async () => {
      const res = await api.get("/employees", {
        params,
      });
      return res.data;
    },

    keepPreviousData: true,
  });
};
