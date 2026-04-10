import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadSimple, CaretDown } from "@phosphor-icons/react";
import { useCreateReceipt, useCreateRefund } from "@/hooks/use-refund-mutations";
import { categoryLabels } from "@/lib/formatters";
import type { RefundCategory } from "@/types/refund";

const refundSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  category: z.custom<RefundCategory>((val) => !!val, "Categoria obrigatória"),
  value: z.string().refine((val) => {
    const rawValue = val.replace(/\D/g, "");
    return Number(rawValue) > 0;
  }, "Valor obrigatório"),
});

type RefundFormValues = z.infer<typeof refundSchema>;

export function NewRefund() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const createReceiptMutation = useCreateReceipt();
  const createRefundMutation = useCreateRefund();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      title: "",
      value: "0,00",
    }
  });

  const formatCurrencyInput = (value: string) => {
    const rawValue = value.replace(/\D/g, "");
    const numberValue = Number(rawValue);
    if (isNaN(numberValue)) return "0,00";
    return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numberValue / 100);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("value", formatCurrencyInput(e.target.value));
  };

  const onSubmit = async (data: RefundFormValues) => {
    if (!file) {
      setFileError("Comprovante obrigatório");
      return;
    }

    try {
      // 1. Enviar recibo
      const receipt = await createReceiptMutation.mutateAsync(file);

      // 2. Extrair valor em centavos
      const valueInCents = Number(data.value.replace(/\D/g, ""));

      // 3. Criar reembolso
      await createRefundMutation.mutateAsync({
        title: data.title,
        category: data.category as RefundCategory,
        value: valueInCents,
        receipt: receipt.id,
      });

      // 4. Redirecionar
      navigate("/refund/success");
    } catch (error) {
      console.error("Erro ao solicitar reembolso:", error);
      alert("Houve um erro na solicitação.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileError("");
    }
  };

  const isSubmitting = createReceiptMutation.isPending || createRefundMutation.isPending;

  return (
    <main className="flex flex-col w-full max-w-[512px] bg-background rounded-[16px] p-10 mx-auto">
      <div className="flex flex-col mb-10 text-left">
        <h1 className="text-[20px] font-bold text-foreground mb-3 leading-6">Nova solicitação de reembolso</h1>
        <p className="text-sm text-muted-foreground leading-[18px]">Dados da despesa para solicitar reembolso.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Nome da solicitação */}
        <label className="flex flex-col gap-2">
          <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
            Nome da solicitação
          </span>
          <div className={`flex w-full h-[48px] rounded-[8px] border bg-transparent overflow-hidden ${errors.title ? "border-destructive" : "border-input"}`}>
            <input
              type="text"
              {...register("title")}
              className="w-full h-full px-4 outline-none text-sm text-foreground placeholder-muted-foreground"
            />
          </div>
          {errors.title && <span className="text-destructive text-xs">{errors.title.message}</span>}
        </label>

        <div className="flex gap-4">
          {/* Categoria */}
          <label className="flex flex-col gap-2 flex-[1.7]">
            <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
              Categoria
            </span>
            <div className={`relative flex w-full h-[48px] rounded-[8px] border bg-transparent overflow-hidden ${errors.category ? "border-destructive" : "border-input"}`}>
              <select
                {...register("category")}
                className="w-full h-full px-4 appearance-none outline-none text-sm text-foreground bg-transparent z-10 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="text-muted-foreground">Selecione</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key} className="text-foreground">{label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-0">
                <CaretDown size={20} />
              </div>
            </div>
            {errors.category && <span className="text-destructive text-xs">{errors.category.message}</span>}
          </label>

          {/* Valor */}
          <label className="flex flex-col gap-2 flex-1">
            <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
              Valor
            </span>
            <div className={`flex w-full h-[48px] rounded-[8px] border bg-transparent overflow-hidden ${errors.value ? "border-destructive" : "border-input"}`}>
              <input
                type="text"
                {...register("value")}
                onChange={handleValueChange}
                className="w-full h-full px-4 outline-none text-sm text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.value && <span className="text-destructive text-xs">{errors.value.message}</span>}
          </label>
        </div>

        {/* Comprovante */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
            Comprovante
          </span>
          <div className={`flex w-full h-[48px] rounded-[8px] border bg-transparent items-center justify-between pl-4 overflow-hidden ${fileError ? "border-destructive" : "border-input"}`}>
            <span className={`text-sm ${file ? "text-foreground" : "text-muted-foreground"} truncate pr-4`}>
              {file ? file.name : "Nenhum arquivo selecionado"}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground size-12 shrink-0 flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <UploadSimple size={24} weight="bold" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
            />
          </div>
          {fileError && <span className="text-destructive text-xs">{fileError}</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[48px] rounded-[8px] bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors mt-[30px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
