import { useDeleteRefund } from "@/hooks/use-refund-mutations";
import { useRefund } from "@/hooks/use-refunds";
import { categoryLabels } from "@/lib/formatters";
import { fetchReceiptUrl } from "@/services/receipts";
import { CaretDown, FileArrowDown } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function RefundDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: refund, isLoading } = useRefund(id || "");
  const deleteMutation = useDeleteRefund();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoadingReceipt, setIsLoadingReceipt] = useState(false);

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center w-full max-w-[512px] bg-background rounded-[16px] p-10 mx-auto min-h-[482px]">
        <p className="text-muted-foreground">Carregando detalhes...</p>
      </main>
    );
  }

  if (!refund) {
    return (
      <main className="flex flex-col items-center justify-center w-full max-w-[512px] bg-background rounded-[16px] p-10 mx-auto min-h-[482px]">
        <p className="text-destructive">Solicitação não encontrada!</p>
      </main>
    );
  }

  const handleOpenReceipt = async () => {
    if (!refund.receipt) return;
    setIsLoadingReceipt(true);
    try {
      const url = await fetchReceiptUrl(refund.receipt.id);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Erro ao abrir comprovante:", error);
      alert("Não foi possível abrir o comprovante.");
    } finally {
      setIsLoadingReceipt(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(refund.id);
      setIsDeleteDialogOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Houve um erro ao deletar a solicitação.");
    }
  };

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(refund.value / 100);

  return (
    <main className="flex flex-col w-full max-w-[512px] bg-background rounded-[16px] p-10 mx-auto">
      <div className="flex flex-col mb-10 text-left">
        <h1 className="text-[20px] font-bold text-foreground mb-3 leading-6">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-muted-foreground leading-[18px]">
          Dados da despesa para solicitar reembolso.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Nome da solicitação */}
        <label className="flex flex-col gap-2">
          <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
            Nome da solicitação
          </span>
          <div className="flex w-full h-[48px] rounded-[8px] border border-input bg-muted overflow-hidden">
            <input
              type="text"
              readOnly
              value={refund.title}
              className="w-full h-full px-4 outline-none text-sm text-foreground bg-transparent opacity-80 cursor-not-allowed"
            />
          </div>
        </label>
        <div className="flex gap-4">
          {/* Categoria */}
          <label className="flex flex-col gap-2 flex-[1.6]">
            <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
              Categoria
            </span>
            <div className="relative flex w-full h-[48px] rounded-[8px] border border-input bg-muted overflow-hidden">
              <input
                type="text"
                readOnly
                value={categoryLabels[refund.category] || refund.category}
                className="w-full h-full px-4 outline-none text-sm text-foreground bg-transparent opacity-80 cursor-not-allowed z-10"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-0">
                <CaretDown size={20} />
              </div>
            </div>
          </label>

          {/* Valor */}
          <label className="flex flex-col gap-2 flex-[1.1]">
            <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
              Valor
            </span>
            <div className="flex w-full h-[48px] rounded-[8px] border border-input bg-muted overflow-hidden">
              <input
                type="text"
                readOnly
                value={formattedValue}
                className="w-full h-full px-4 outline-none text-sm text-foreground bg-transparent opacity-80 cursor-not-allowed"
              />
            </div>
          </label>
        </div>
        {/* Abrir comprovante */}
        <div className="flex items-center gap-2 mt-4 ml-2">
          <button
            type="button"
            onClick={handleOpenReceipt}
            disabled={isLoadingReceipt || !refund.receipt}
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-semibold mt-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileArrowDown size={24} weight="bold" />
            <span className="text-sm">
              {isLoadingReceipt ? "Abrindo..." : "Abrir comprovante"}
            </span>
          </button>
        </div>
        {/* Submit */}
        <button
          type="button"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="w-full h-[48px] rounded-[8px] bg-transparent border border-secondary bg-secondary text-foreground font-bold text-sm cursor-pointer hover:bg-secondary/90 transition-colors mt-[30px]"
        >
          Excluir
        </button>{" "}
        {/* Wait, the trigger button in Image 2 is just dark bg "Excluir". Updated class to bg-secondary! Actually dark bg is #28362F maybe? No, secondary is dark gray in this theme maybe? */}
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl w-full max-w-[400px] p-8 shadow-xl flex flex-col animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Excluir solicitação
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
              Tem certeza que deseja excluir essa solicitação? Essa ação é
              irreversível.
            </p>
            <div className="flex justify-end gap-6 items-center w-full">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="text-primary font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="h-10 px-6 rounded-[8px] bg-primary cursor-pointer text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Excluindo..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
