import { getAllPermissions, getPermissionById } from "@/services/permission-service";
import { useQuery } from "@tanstack/react-query";

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => getAllPermissions(),
  });
};

export const usePermissionById = (id: string) => {
  return useQuery({
    queryKey: ["permission", id],
    queryFn: () => getPermissionById(id),
  });
};
