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

export function getReceiptDownloadUrl(id: string): string {
  return `${api.defaults.baseURL}/receipts/download/${id}`;
}
