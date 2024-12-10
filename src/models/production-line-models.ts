export interface ProductionLineDto {
  id: string;
  canvasData: Record<string, unknown>;
}

export interface CreateProductionLineRequest {
  canvasData: Record<string, unknown>;
}