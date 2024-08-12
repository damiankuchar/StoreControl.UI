export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors: InnerApiError[];
}

export interface InnerApiError {
  message: string;
  error: string;
  property: string;
}

export interface ApiErrorDescription {
  errorTitle: string;
  errorDescription: string;
}
