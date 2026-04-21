import { Link } from "@tanstack/react-router";
import { Plane, MapPin, Route, Star, User } from "lucide-react";
import { AccessibilityBar } from "./AccessibilityBar";
import logoInfinity from "@/assets/logo-infinity.png";

export function SiteHeader() {
  return (
    <>
      <AccessibilityBar />
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Viagem sem Barreiras — página inicial">
            <img
              src={logoInfinity}
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
              aria-hidden="true"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-foreground">Viagem sem Barreiras</span>
              <span className="text-xs font-medium text-muted-foreground">Turismo acessível e neurodiverso</span>
            </span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
            <NavItem to="/buscar" icon={MapPin} label="Buscar" />
            <NavItem to="/roteiros" icon={Route} label="Roteiros" />
            <NavItem to="/avaliacoes" icon={Star} label="Avaliações" />
          </nav>
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:bg-primary/90"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            <span>Entrar</span>
          </Link>
        </div>
      </header>
    </>
  );
}

function NavItem({ to, icon: Icon, label }: { to: string; icon: typeof Plane; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
      activeProps={{ className: "bg-accent text-accent-foreground" }}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
