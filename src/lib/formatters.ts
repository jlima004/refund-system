export function formatCurrency(valueInCents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);
}

export const categoryLabels: Record<string, string> = {
  food: "Alimentação",
  hosting: "Hospedagem",
  transport: "Transporte",
  services: "Serviços",
  other: "Outros",
};

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  // Add UTC offset compensation if required, or simply format correctly to local timezone
  // PRD specifically expects "df/MM/yyyy" typically
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
