import { getAllProductionLines, getProductionLineById } from "@/services/production-line-services";
import { useQuery } from "@tanstack/react-query";

export const useProductionLines = () => {
  return useQuery({
    queryKey: ["production-lines"],
    queryFn: () => getAllProductionLines(),
  });
};

export const useProductionLineById = (id: string) => {
  return useQuery({
    queryKey: ["production-line", id],
    queryFn: () => getProductionLineById(id),
  });
};
