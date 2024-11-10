import { CreateUserRequest, UpdateUserRequest } from "@/models/user-models";
import { createUser, deleteUser, updateUser } from "@/services/user-service";
import { useUserStore } from "@/stores/user-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const closeSheet = useUserStore((state) => state.closeSheet);

  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      toast.success("User has been successfully created!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeSheet();
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const closeSheet = useUserStore((state) => state.closeSheet);

  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateUserRequest }) => updateUser(variables.id, variables.data),
    onSuccess: ({ id }) => {
      toast.success("User has been successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      closeSheet();
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const closeDialog = useUserStore((state) => state.closeDialog);

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("User has been successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeDialog();
    },
  });
};
