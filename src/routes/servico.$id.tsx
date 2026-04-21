import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, MapPin, ChevronLeft, ShieldCheck, Phone, AmbulanceIcon } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AccessibilityBadge, PcdBadge } from "@/components/AccessibilityBadge";
import { DESTINATIONS, REVIEWS, SERVICES } from "@/lib/mock-data";

export const Route = createFileRoute("/servico/$id")({
  component: ServicoPage,
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.id === params.id);
    if (!service) throw notFound();
    return { service };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold">Serviço não encontrado</h1>
        <Link to="/buscar" className="mt-4 inline-block text-primary underline">Voltar à busca</Link>
      </div>
    </div>
  ),
});

function ServicoPage() {
  const { service } = Route.useLoaderData();
  const destination = DESTINATIONS.find((d) => d.id === service.destinationId)!;
  const reviews = REVIEWS.filter((r) => r.serviceId === service.id);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main" className="container mx-auto px-4 py-8">
        <Link to="/buscar" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Voltar à busca
        </Link>

        <header className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <img
            src={service.image}
            alt={`Foto principal de ${service.title}`}
            width={1024}
            height={768}
            className="aspect-[4/3] w-full rounded-2xl border-2 border-border object-cover shadow-elevated"
          />
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-border bg-card p-6">
            <div>
              <p className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {destination.name}, {destination.state}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{service.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                {service.rating.toFixed(1)} ({service.reviewCount.toLocaleString("pt-BR")})
              </span>
              <PcdBadge />
            </div>
            <p className="text-foreground/90">{service.description}</p>
            <div className="mt-auto flex items-end justify-between rounded-xl bg-muted/60 p-4">
              <div>
                <p className="text-xs text-muted-foreground">A partir de</p>
                <p className="text-3xl font-extrabold text-primary">R$ {service.price}</p>
                <p className="text-xs text-muted-foreground">por noite, taxas inclusas</p>
              </div>
              <button className="rounded-xl bg-sunflower px-5 py-3 font-bold text-sunflower-foreground shadow-soft hover:brightness-95">
                Simular reserva
              </button>
            </div>
          </div>
        </header>

        <section aria-labelledby="acessibilidade" className="mt-12">
          <h2 id="acessibilidade" className="text-2xl font-extrabold">Recursos de acessibilidade</h2>
          <p className="mt-1 text-muted-foreground">Informações declaradas pelo estabelecimento e validadas pela comunidade.</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {service.features.map((f) => (
              <li key={f}>
                <AccessibilityBadge feature={f} />
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <section aria-labelledby="reviews">
            <h2 id="reviews" className="text-2xl font-extrabold">Avaliações da comunidade</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{service.pcdReviewCount}</span> avaliações verificadas por Pessoas com Deficiência.
            </p>
            <ul className="mt-6 space-y-4">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-2xl border-2 border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{r.author}</p>
                      <p className="text-xs text-muted-foreground">{r.date}{r.pcdType ? ` · ${r.pcdType}` : ""}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                        <Star className="h-3 w-3 fill-current" aria-hidden="true" /> {r.rating}
                      </span>
                      {r.isPcD && <PcdBadge />}
                    </div>
                  </div>
                  <p className="mt-3 text-foreground/90">“{r.comment}”</p>
                  <p className="mt-3 text-xs font-bold text-success">
                    Acessibilidade: {r.accessibilityRating}/5
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <aside aria-labelledby="apoio" className="space-y-4">
            <h2 id="apoio" className="text-2xl font-extrabold">Apoio no destino</h2>
            <SupportCard
              icon={AmbulanceIcon}
              title="Hospital de referência"
              text="Hospital Municipal — atendimento 24h, 2,1 km do hotel"
            />
            <SupportCard icon={Phone} title="Transporte acessível" text="UrbanMob Adaptado · 0800 123 4567" />
            <SupportCard
              icon={ShieldCheck}
              title="Selo Inclusão Verificada"
              text="Auditado pela equipe Viagem sem Barreiras em Mar/2026"
            />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function SupportCard({ icon: Icon, title, text }: { icon: typeof Phone; title: string; text: string }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  );
}
