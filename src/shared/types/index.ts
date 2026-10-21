/**
 * Shared API Response wrappers matching Backend ApiResponse<T>
 */
export interface ApiResponse<T> {
  code: number;
  message?: string;
  result: T;
}

export interface PageResponse<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  data: T[];
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
