export interface ProductionLineDto {
  id: string;
  name: string;
  description?: string;
  canvasData: Record<string, unknown>;
}

export interface CreateProductionLineRequest {
  name: string;
  description?: string;
  canvasData: Record<string, unknown>;
}

export interface UpdateProductionLineRequest {
  name: string;
  description?: string;
  canvasData: Record<string, unknown>;
}
