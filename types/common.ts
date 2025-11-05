export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  image_url?: string;
}

