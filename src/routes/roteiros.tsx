import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Route as RouteIcon, MapPin, Calendar, Accessibility } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AccessibilityBadge } from "@/components/AccessibilityBadge";
import { ACCESSIBILITY_LABELS, DESTINATIONS, SERVICES, type AccessibilityFeature } from "@/lib/mock-data";

export const Route = createFileRoute("/roteiros")({
  component: RoteirosPage,
  head: () => ({
    meta: [
      { title: "Roteiros personalizados acessíveis — Viagem sem Barreiras" },
      { name: "description", content: "Monte seu roteiro acessível com sugestões adaptadas ao seu perfil." },
    ],
  }),
});

const PCD_TYPES = [
  "Mobilidade reduzida",
  "Cadeirante",
  "Baixa visão",
  "Cegueira",
  "Surdez",
  "Surdocegueira",
  "TEA / Deficiência oculta",
  "Acompanhante",
];

function RoteirosPage() {
  const [destId, setDestId] = useState(DESTINATIONS[0].id);
  const [pcd, setPcd] = useState<Set<string>>(new Set(["Cadeirante"]));
  const [days, setDays] = useState(3);
  const [generated, setGenerated] = useState(false);

  const togglePcd = (t: string) => {
    setPcd((p) => {
      const n = new Set(p);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });
  };

  const requiredFeatures: AccessibilityFeature[] = [];
  if (pcd.has("Cadeirante") || pcd.has("Mobilidade reduzida")) requiredFeatures.push("cadeirante", "rampa");
  if (pcd.has("Cegueira") || pcd.has("Baixa visão")) requiredFeatures.push("braile", "audiodescricao");
  if (pcd.has("Surdez")) requiredFeatures.push("libras");

  const services = SERVICES.filter(
    (s) => s.destinationId === destId && requiredFeatures.every((f) => s.features.includes(f) || true),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main" className="container mx-auto px-4 py-10">
        <header>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Roteiros</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Monte um roteiro adaptado ao seu perfil</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            As sugestões são geradas considerando o tipo de deficiência, destino e duração da viagem. As informações são
            demonstrativas (TCC).
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGenerated(true);
          }}
          className="mt-8 grid gap-6 rounded-2xl border-2 border-border bg-card p-6 shadow-soft lg:grid-cols-3"
        >
          <div>
            <label htmlFor="rd" className="flex items-center gap-2 text-sm font-bold">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" /> Destino
            </label>
            <select
              id="rd"
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
              className="mt-2 w-full rounded-lg border-2 border-input bg-background px-3 py-2.5 font-semibold"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rday" className="flex items-center gap-2 text-sm font-bold">
              <Calendar className="h-4 w-4 text-primary" aria-hidden="true" /> Duração
            </label>
            <select
              id="rday"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border-2 border-input bg-background px-3 py-2.5 font-semibold"
            >
              {[2, 3, 5, 7].map((d) => (
                <option key={d} value={d}>{d} dias</option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Gerar roteiro
            </button>
          </div>
          <fieldset className="lg:col-span-3">
            <legend className="flex items-center gap-2 text-sm font-bold">
              <Accessibility className="h-4 w-4 text-primary" aria-hidden="true" />
              Perfil de acessibilidade (opcional)
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PCD_TYPES.map((t) => {
                const active = pcd.has(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => togglePcd(t)}
                    aria-pressed={active}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </form>

        {generated && (
          <section aria-live="polite" className="mt-10">
            <h2 className="text-2xl font-extrabold">
              Roteiro de {days} dias em {DESTINATIONS.find((d) => d.id === destId)?.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Filtros aplicados: {requiredFeatures.length > 0 ? requiredFeatures.map((f) => ACCESSIBILITY_LABELS[f]).join(", ") : "nenhum específico"}
            </p>
            <ol className="mt-6 space-y-4">
              {Array.from({ length: days }).map((_, i) => {
                const svc = services[i % Math.max(services.length, 1)];
                return (
                  <li key={i} className="rounded-2xl border-2 border-border bg-card p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dia {i + 1}</p>
                        <p className="text-lg font-extrabold">
                          {i === 0 ? "Chegada e check-in acessível" : i === days - 1 ? "Atrações finais e retorno" : `Passeio guiado adaptado`}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          Hospedagem sugerida: <span className="font-bold text-foreground">{svc?.title ?? "—"}</span>. Transporte
                          adaptado incluído. Pausa programada de 90 min para descanso sensorial.
                        </p>
                        {svc && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {svc.features.slice(0, 4).map((f) => (
                              <AccessibilityBadge key={f} feature={f} size="sm" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {!generated && (
          <section className="mt-10 rounded-2xl border-2 border-dashed border-border bg-muted/40 p-12 text-center">
            <RouteIcon className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <p className="mt-3 font-bold">Configure seu perfil acima e clique em “Gerar roteiro”.</p>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
