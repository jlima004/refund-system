import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CloudArrowUp, CaretDown, CaretUp } from "@phosphor-icons/react";
import { useCreateReceipt, useCreateRefund } from "@/hooks/use-refund-mutations";
import { categoryLabels } from "@/lib/formatters";
import type { RefundCategory } from "@/types/refund";

const refundSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  category: z.custom<RefundCategory>((val) => !!val, "Selecione uma categoria"),
  value: z.string().refine((val) => {
    const rawValue = val.replace(/\D/g, "");
    return Number(rawValue) > 0;
  }, "Informe o valor"),
});

type RefundFormValues = z.infer<typeof refundSchema>;

const CATEGORIES = Object.entries(categoryLabels) as [RefundCategory, string][];

export function NewRefund() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const createReceiptMutation = useCreateReceipt();
  const createRefundMutation = useCreateRefund();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      title: "",
      value: "0,00",
    },
  });

  const formatCurrencyInput = (value: string) => {
    const rawValue = value.replace(/\D/g, "");
    const numberValue = Number(rawValue);
    if (isNaN(numberValue)) return "0,00";
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue / 100);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("value", formatCurrencyInput(e.target.value), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: RefundFormValues) => {
    if (!file) {
      setFileError("Comprovante obrigatório");
      return;
    }
    try {
      const receipt = await createReceiptMutation.mutateAsync(file);
      const valueInCents = Number(data.value.replace(/\D/g, ""));
      await createRefundMutation.mutateAsync({
        title: data.title,
        category: data.category as RefundCategory,
        value: valueInCents,
        receipt: receipt.id,
      });
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

  const isSubmitting =
    createReceiptMutation.isPending || createRefundMutation.isPending;

  return (
    <main className="flex flex-col w-full max-w-[512px] bg-background rounded-[16px] p-10 mx-auto">
      <div className="flex flex-col mb-10 text-left">
        <h1 className="text-[20px] font-bold text-foreground mb-3 leading-6">
          Nova solicitação de reembolso
        </h1>
        <p className="text-sm text-muted-foreground leading-[18px]">
          Dados da despesa para solicitar reembolso.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Campo: Nome da solicitação */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase font-normal text-primary tracking-wide">
            Nome da solicitação
          </span>
          <div
            className={`flex w-full h-[48px] rounded-[8px] border bg-transparent overflow-hidden transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${
              errors.title ? "border-destructive" : "border-input"
            }`}
          >
            <input
              type="text"
              {...register("title")}
              className="w-full h-full px-4 outline-none text-sm text-foreground bg-transparent"
            />
          </div>
          {errors.title && (
            <span className="text-destructive text-xs">{errors.title.message}</span>
          )}
        </div>

        {/* Linha: Categoria + Valor */}
        <div className="flex gap-4">
          {/* Categoria - Select customizado */}
          <div className="flex flex-col gap-2 flex-[1.7]">
            <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
              Categoria
            </span>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`w-full h-[48px] rounded-[8px] border bg-transparent px-4 flex items-center justify-between text-sm transition-all cursor-pointer focus:outline-none ${
                      dropdownOpen
                        ? "border-primary ring-1 ring-primary"
                        : errors.category
                        ? "border-destructive"
                        : "border-input"
                    } ${!field.value ? "text-muted-foreground" : "text-foreground"}`}
                  >
                    <span>
                      {field.value
                        ? categoryLabels[field.value as RefundCategory]
                        : "Selecione"}
                    </span>
                    {dropdownOpen ? (
                      <CaretUp size={16} className="text-muted-foreground shrink-0" />
                    ) : (
                      <CaretDown size={16} className="text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {dropdownOpen && (
                    <>
                      {/* Overlay para fechar ao clicar fora */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-background rounded-[8px] shadow-lg border border-input z-20 overflow-hidden py-1">
                        {CATEGORIES.map(([key, label]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              field.onChange(key);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-secondary ${
                              field.value === key
                                ? "text-primary font-semibold"
                                : "text-foreground"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            />
            {errors.category && (
              <span className="text-destructive text-xs">{errors.category.message}</span>
            )}
          </div>

          {/* Valor */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
              Valor
            </span>
            <div
              className={`flex w-full h-[48px] rounded-[8px] border bg-transparent overflow-hidden transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${
                errors.value ? "border-destructive" : "border-input"
              }`}
            >
              <input
                type="text"
                {...register("value")}
                onChange={handleValueChange}
                className="w-full h-full px-4 outline-none text-sm text-foreground bg-transparent"
              />
            </div>
            {errors.value && (
              <span className="text-destructive text-xs">{errors.value.message}</span>
            )}
          </div>
        </div>

        {/* Campo: Comprovante — linha própria, largura total */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase font-normal text-muted-foreground tracking-wide">
            Comprovante
          </span>
          <div
            className={`flex w-full h-[48px] rounded-[8px] border bg-transparent overflow-hidden transition-all ${
              fileError ? "border-destructive" : "border-input"
            }`}
          >
            <span
              className={`flex flex-1 items-center px-4 text-sm truncate ${
                file ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {file ? file.name : "Nome do arquivo.pdf"}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground h-full aspect-square flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shrink-0"
            >
              <CloudArrowUp size={22} />
            </button>
          </div>
          {fileError && (
            <span className="text-destructive text-xs">{fileError}</span>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,application/pdf"
          />
        </div>

        {/* Botão: Enviar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[48px] rounded-[8px] bg-primary cursor-pointer text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
