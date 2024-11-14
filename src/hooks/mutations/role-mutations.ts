import { deleteRole } from "@/services/role-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
