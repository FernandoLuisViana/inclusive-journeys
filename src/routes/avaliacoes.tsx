import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PcdBadge } from "@/components/AccessibilityBadge";
import { REVIEWS, SERVICES } from "@/lib/mock-data";

export const Route = createFileRoute("/avaliacoes")({
  component: AvaliacoesPage,
  head: () => ({
    meta: [
      { title: "Avaliações da comunidade — Viagem sem Barreiras" },
      { name: "description", content: "Avaliações verificadas de Pessoas com Deficiência sobre acessibilidade real dos serviços." },
    ],
  }),
});

function AvaliacoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main" className="container mx-auto px-4 py-10">
        <header>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Comunidade</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Avaliações verificadas pela comunidade PcD</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Todas as avaliações passam por moderação. Avaliações de Pessoas com Deficiência são destacadas com o símbolo do girassol.
          </p>
        </header>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => {
            const svc = SERVICES.find((s) => s.id === r.serviceId)!;
            return (
              <li key={r.id} className="rounded-2xl border-2 border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{svc.title}</p>
                    <p className="font-bold">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{r.date}{r.pcdType ? ` · ${r.pcdType}` : ""}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-sm font-bold text-primary-foreground">
                    <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> {r.rating}
                  </span>
                </div>
                <p className="mt-4 text-foreground/90">“{r.comment}”</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs font-bold text-success">Acessibilidade: {r.accessibilityRating}/5</span>
                  {r.isPcD && <PcdBadge />}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
