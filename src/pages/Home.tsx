import { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, CaretLeft, CaretRight, ForkKnife, Bed, Car, Wrench, Package } from "@phosphor-icons/react";
import { useRefunds } from "@/hooks/use-refunds";
import { categoryLabels } from "@/lib/formatters";

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "food": return <ForkKnife weight="fill" size={18} />;
    case "hosting": return <Bed weight="fill" size={18} />;
    case "transport": return <Car weight="fill" size={18} />;
    case "services": return <Wrench weight="fill" size={18} />;
    case "other":
    default: return <Package weight="fill" size={18} />;
  }
};

export function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading } = useRefunds(page, search);

  const handleSearch = () => {
    setSearch(inputValue);
    setPage(1);
  };

  return (
    <main className="flex flex-col w-full max-w-[1082px] bg-background rounded-[16px] p-10 min-h-[584px]">
      <h1 className="text-xl font-bold text-foreground mb-6">Solicitações</h1>

      <div className="flex gap-3 border-b border-border pb-6 mb-6 w-full">
        <input
          type="text"
          className="flex-1 h-12 px-4 rounded-lg border border-input bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm text-foreground placeholder:text-muted-foreground"
          placeholder="Pesquisar pelo nome"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="bg-primary text-primary-foreground size-12 cursor-pointer rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
        >
          <MagnifyingGlass size={24} weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Carregando...</p>
        ) : data?.data.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhuma solicitação encontrada.</p>
        ) : (
          data?.data.map((refund) => (
            <Link 
              to={`/refund/${refund.id}`} 
              key={refund.id} 
              className="flex items-center justify-between py-1 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <div className="bg-secondary p-[8px] rounded-full text-primary">
                  <CategoryIcon category={refund.category} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-foreground">{refund.title}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {categoryLabels[refund.category] || refund.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">R$</span>
                <span className="font-semibold text-sm text-foreground">
                  {(refund.value / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {data?.meta && data.meta.lastPage > 1 && (
        <div className="flex items-center justify-center gap-2 mt-auto pt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="size-8 rounded-lg cursor-pointer bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <span className="text-sm font-normal text-muted-foreground">
            {page}/{data.meta.lastPage || 1}
          </span>
          <button
            disabled={page === (data.meta.lastPage || 1)}
            onClick={() => setPage(page + 1)}
            className="size-8 rounded-lg cursor-pointer bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>
      )}
    </main>
  );
}
