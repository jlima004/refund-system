import { Link, useLocation } from "react-router-dom";
import { ArrowClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();

  return (
    <header className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1185px] flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-2 text-primary">
        <ArrowClockwise size={28} weight="bold" />
        <span className="font-bold text-[22px] lowercase tracking-tight">refund</span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link
          to="/"
          className={`px-4 py-3 font-semibold transition-colors ${
            location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Solicitações de reembolso
        </Link>
        <Link to="/refund/new" tabIndex={-1}>
          <Button className="h-12 px-6 rounded-lg bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 font-bold">
            Nova solicitação
          </Button>
        </Link>
      </div>
    </header>
  );
}
