import { CreateRoleRequest, UpdateRoleRequest } from "@/models/role-models";
import { createRole, deleteRole, updateRole } from "@/services/role-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateRoleRequest }) => updateRole(variables.id, variables.data),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", id] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
