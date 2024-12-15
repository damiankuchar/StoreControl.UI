import { CreateProductionLineRequest, ProductionLineDto, UpdateProductionLineRequest } from "@/models/production-line-models";
import api from "@/utils/axios-instance";

export const getAllProductionLines = async () => {
  const response = await api.get<ProductionLineDto[]>("production-lines");
  return response.data;
};

export const getProductionLineById = async (id: string) => {
  const response = await api.get<ProductionLineDto>(`production-lines/${id}`);
  return response.data;
};

export const createProductionLine = async (body: CreateProductionLineRequest) => {
  const response = await api.post<ProductionLineDto>("production-lines", body);
  return response.data;
};

export const updateProductionLine = async (id: string, body: UpdateProductionLineRequest) => {
  const response = await api.put<ProductionLineDto>(`production-lines/${id}`, body);
  return response.data;
}

export const deleteProductionLine = async (id: string) => {
  const response = await api.delete(`production-lines/${id}`);
  return response.data;
};
