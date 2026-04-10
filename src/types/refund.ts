export interface Refund {
  id: string;
  title: string;
  category: RefundCategory;
  value: number; // em centavos
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  receipt: Receipt;
}

export type RefundCategory = "food" | "hosting" | "transport" | "services" | "other";

export interface Receipt {
  id: string;
  originalFilename: string;
  filename: string;
  path: string;
  extname: string;
  refundId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
  };
  data: T[];
}
