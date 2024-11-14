import { useQuery } from "@tanstack/react-query";
import { getAllRoles, getRoleById } from "@/services/role-service";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => getAllRoles(),
  });
};

export const useRoleById = (id: string) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRoleById(id),
  });
};
