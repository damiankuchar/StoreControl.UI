import { CreateProductionLineRequest, UpdateProductionLineRequest } from "@/models/production-line-models";
import { createProductionLine, deleteProductionLine, updateProductionLine } from "@/services/production-line-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProductionLine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductionLineRequest) => createProductionLine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production-lines"] });
    },
  });
};

export const useUpdateProductionLine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateProductionLineRequest }) =>
      updateProductionLine(variables.id, variables.data),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["production-line", id] });
      queryClient.invalidateQueries({ queryKey: ["production-lines"] });
    },
  });
};

export const useDeleteProductionLine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProductionLine(id),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["production-line", id] });
      queryClient.invalidateQueries({ queryKey: ["production-lines"] });
    },
  });
};
