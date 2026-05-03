import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ["departments"],

    queryFn: async () => {
      const res = await api.get("/departments");
      return res.data;
    },
  });
};
