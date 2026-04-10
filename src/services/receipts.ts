import { api } from "./api";
import type { Receipt } from "../types/refund";

export async function createReceipt(file: File): Promise<Receipt> {
  const formData = new FormData();
  formData.append("receiptFile", file);
  
  const response = await api.post<{ receipt: Receipt }>("/receipts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data.receipt;
}

export async function fetchReceiptUrl(id: string): Promise<string> {
  const response = await api.get<{ url: string }>(`/receipts/download/${id}`);
  return `${api.defaults.baseURL}${response.data.url}`;
}
