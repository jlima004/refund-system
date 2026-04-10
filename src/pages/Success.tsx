import { Link } from "react-router-dom";

// SVG inline baseado exatamente no design do Figma (node 2301:662)
// Círculo incompleto com checkmark - círculo tem abertura no topo-direito
function SuccessIcon() {
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo incompleto — abre no topo-direito, como no Figma */}
      <path
        d="M90 20C96.5 27.5 100.5 37.5 100.5 48.5C100.5 74.5 79.5 95.5 53.5 95.5C27.5 95.5 6.5 74.5 6.5 48.5C6.5 22.5 27.5 1.5 53.5 1.5C63 1.5 71.8 4.3 79 9.2"
        stroke="#1F8459"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Checkmark */}
      <path
        d="M32 50L47 65L76 36"
        stroke="#1F8459"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Success() {
  return (
    <main className="flex flex-col items-center text-center justify-center w-full max-w-[512px] bg-background rounded-[16px] p-10 mx-auto min-h-[388px]">
      <h1 className="text-2xl font-bold text-primary mb-8">Solicitação enviada!</h1>

      <SuccessIcon />

      <p className="text-sm text-muted-foreground mt-8 mb-8 max-w-[340px] leading-relaxed">
        Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.
      </p>

      <Link to="/" className="w-full">
        <button className="w-full h-[48px] rounded-[8px] bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 font-bold transition-colors">
          Nova solicitação
        </button>
      </Link>
    </main>
  );
}
