import { api } from "./api";
import type { PaginatedResponse, Refund, RefundCategory } from "../types/refund";

interface CreateRefundDTO {
  title: string;
  category: RefundCategory;
  value: number;
  receipt: string;
}

export async function getRefunds({ page = 1, search = "" }: { page?: number; search?: string }): Promise<PaginatedResponse<Refund>> {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (search) params.append("q", search);
  
  const response = await api.get<{ refunds: PaginatedResponse<Refund> }>(`/refunds?${params.toString()}`);
  return response.data.refunds;
}

export async function getRefund(id: string): Promise<Refund> {
  const response = await api.get<{ refund: Refund }>(`/refunds/${id}`);
  return response.data.refund;
}

export async function createRefund(data: CreateRefundDTO): Promise<Refund> {
  const response = await api.post<{ refund: Refund }>("/refunds", data);
  return response.data.refund;
}

export async function deleteRefund(id: string): Promise<void> {
  await api.delete(`/refunds/${id}`);
}
