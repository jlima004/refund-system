import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRefunds, getRefund } from "../services/refunds";

export function useRefunds(page: number, search: string) {
  return useQuery({
    queryKey: ["refunds", { page, search }],
    queryFn: () => getRefunds({ page, search }),
    placeholderData: keepPreviousData,
  });
}

export function useRefund(id: string) {
  return useQuery({
    queryKey: ["refund", id],
    queryFn: () => getRefund(id),
    enabled: Boolean(id),
  });
}
