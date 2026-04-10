import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRefund, deleteRefund } from "../services/refunds";
import { createReceipt } from "../services/receipts";

export function useCreateReceipt() {
  return useMutation({
    mutationFn: createReceipt,
  });
}

export function useCreateRefund() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createRefund,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
    },
  });
}

export function useDeleteRefund() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteRefund,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
    },
  });
}
