import { useQuery } from "@tanstack/react-query";
import { Option } from "@/components/ui/multiple-selector";
import { getAllRoles } from "@/services/role-service";

export const useRolesOptions = () => {
  return useQuery({
    queryKey: ["roles-options"],
    queryFn: () => getAllRoles(),
    select: (roles) =>
      roles.map<Option>((role) => ({
        label: role.name,
        value: role.id,
        disable: false,
      })),
  });
};
