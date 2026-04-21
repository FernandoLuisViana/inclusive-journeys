import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Accessibility, Star, MapPin, SlidersHorizontal, Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AccessibilityBadge, PcdBadge } from "@/components/AccessibilityBadge";
import {
  ACCESSIBILITY_LABELS,
  DESTINATIONS,
  SERVICES,
  type AccessibilityFeature,
} from "@/lib/mock-data";

export const Route = createFileRoute("/buscar")({
  component: BuscarPage,
  head: () => ({
    meta: [
      { title: "Buscar viagens acessíveis — Viagem sem Barreiras" },
      { name: "description", content: "Filtre hospedagens e serviços por recursos de acessibilidade detalhados." },
    ],
  }),
});

const ALL_FEATURES = Object.keys(ACCESSIBILITY_LABELS) as AccessibilityFeature[];

function BuscarPage() {
  const [active, setActive] = useState<Set<AccessibilityFeature>>(new Set());
  const [destination, setDestination] = useState<string>("");
  const [query, setQuery] = useState("");

  const toggle = (f: AccessibilityFeature) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  const results = useMemo(() => {
    return SERVICES.filter((s) => {
      if (destination && s.destinationId !== destination) return false;
      if (query && !s.title.toLowerCase().includes(query.toLowerCase())) return false;
      for (const f of active) if (!s.features.includes(f)) return false;
      return true;
    });
  }, [active, destination, query]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main" className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Catálogo</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Encontre viagens com a acessibilidade que você precisa</h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* SIDEBAR FILTROS */}
          <aside aria-label="Filtros de busca" className="space-y-6">
            <div className="rounded-2xl border-2 border-border bg-card p-5">
              <label htmlFor="q" className="flex items-center gap-2 text-sm font-bold">
                <Search className="h-4 w-4 text-primary" aria-hidden="true" />
                Buscar por nome
              </label>
              <input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: Hotel Acolher"
                className="mt-2 w-full rounded-lg border-2 border-input bg-background px-3 py-2.5 font-semibold outline-none focus:border-primary"
              />
            </div>

            <div className="rounded-2xl border-2 border-border bg-card p-5">
              <label htmlFor="dest" className="flex items-center gap-2 text-sm font-bold">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                Destino
              </label>
              <select
                id="dest"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-2 w-full rounded-lg border-2 border-input bg-background px-3 py-2.5 font-semibold outline-none focus:border-primary"
              >
                <option value="">Todos os destinos</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.state}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="rounded-2xl border-2 border-border bg-card p-5">
              <legend className="flex items-center gap-2 px-1 text-sm font-bold">
                <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
                Recursos de acessibilidade
              </legend>
              <p className="mt-1 text-xs text-muted-foreground">Marque o que é essencial para você.</p>
              <ul className="mt-4 space-y-2">
                {ALL_FEATURES.map((f) => {
                  const id = `feat-${f}`;
                  const checked = active.has(f);
                  return (
                    <li key={f}>
                      <label
                        htmlFor={id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition ${
                          checked ? "border-primary bg-primary/5 text-foreground" : "border-transparent hover:bg-accent"
                        }`}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(f)}
                          className="h-5 w-5 cursor-pointer accent-[var(--color-primary)]"
                        />
                        {ACCESSIBILITY_LABELS[f]}
                      </label>
                    </li>
                  );
                })}
              </ul>
              {active.size > 0 && (
                <button
                  type="button"
                  onClick={() => setActive(new Set())}
                  className="mt-4 w-full rounded-lg border-2 border-border bg-background py-2 text-sm font-bold hover:bg-accent"
                >
                  Limpar filtros ({active.size})
                </button>
              )}
            </fieldset>
          </aside>

          {/* RESULTADOS */}
          <section aria-live="polite" aria-label="Resultados da busca">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-muted-foreground">
                <span className="text-foreground">{results.length}</span> resultado{results.length !== 1 ? "s" : ""}
              </p>
              <select className="rounded-lg border-2 border-input bg-background px-3 py-2 text-sm font-semibold">
                <option>Mais relevantes</option>
                <option>Maior nota de acessibilidade</option>
                <option>Menor preço</option>
              </select>
            </div>

            {results.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
                <Accessibility className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
                <p className="mt-3 font-bold">Nenhum serviço encontrado com esses filtros.</p>
                <p className="text-sm text-muted-foreground">Tente reduzir os critérios para ver mais opções.</p>
              </div>
            ) : (
              <ul className="space-y-5">
                {results.map((s) => (
                  <li key={s.id}>
                    <Link
                      to="/servico/$id"
                      params={{ id: s.id }}
                      className="grid gap-0 overflow-hidden rounded-2xl border-2 border-border bg-card transition hover:-translate-y-0.5 hover:shadow-elevated sm:grid-cols-[280px_1fr]"
                    >
                      <div className="relative aspect-[4/3] sm:aspect-auto">
                        <img
                          src={s.image}
                          alt={`Foto de ${s.title}`}
                          width={1024}
                          height={768}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-3 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {DESTINATIONS.find((d) => d.id === s.destinationId)?.name}
                            </p>
                            <h2 className="mt-0.5 text-xl font-extrabold">{s.title}</h2>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
                            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                            {s.rating.toFixed(1)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.features.slice(0, 5).map((f) => (
                            <AccessibilityBadge key={f} feature={f} size="sm" />
                          ))}
                          {s.features.length > 5 && (
                            <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                              +{s.features.length - 5}
                            </span>
                          )}
                        </div>
                        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                          <PcdBadge />
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">A partir de</p>
                            <p className="text-2xl font-extrabold text-primary">R$ {s.price}</p>
                            <p className="text-xs text-muted-foreground">por noite</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
