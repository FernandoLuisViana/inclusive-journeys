import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, Calendar, Users, Accessibility, ShieldCheck, Star, Sparkles, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DESTINATIONS } from "@/lib/mock-data";
import heroImg from "@/assets/hero-travelers.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Viagem sem Barreiras — Turismo acessível para Pessoas com Deficiência" },
      {
        name: "description",
        content:
          "Plataforma de viagens com filtros de acessibilidade, avaliações verificadas por PcD, roteiros personalizados e conformidade WCAG 2.1 AA.",
      },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.42_0.16_250)]" aria-hidden="true" />
          <div className="container relative mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
            <div className="text-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-sunflower px-3 py-1.5 text-xs font-bold text-sunflower-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                WCAG 2.1 AA · LGPD · Conteúdo moderado
              </span>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Viaje com autonomia.<br />
                <span className="text-sunflower">Sem barreiras.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">
                Encontre hospedagens, atrações e transporte com informações detalhadas de acessibilidade e avaliações verificadas por
                Pessoas com Deficiência.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/buscar"
                  className="inline-flex items-center gap-2 rounded-xl bg-sunflower px-6 py-3.5 font-bold text-sunflower-foreground shadow-elevated transition hover:brightness-95"
                >
                  Buscar viagens
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/roteiros"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3.5 font-bold text-primary-foreground hover:bg-primary-foreground/20"
                >
                  Montar roteiro personalizado
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImg}
                alt="Grupo diverso de viajantes felizes em uma praia tropical, incluindo uma mulher em cadeira de rodas, uma senhora com bengala branca e crianças"
                width={1536}
                height={1024}
                className="rounded-3xl border-4 border-primary-foreground/20 object-cover shadow-elevated"
              />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-background p-4 shadow-elevated sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold leading-none">+12 mil</p>
                    <p className="text-xs text-muted-foreground">avaliações por PcD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH BAR */}
        <section aria-labelledby="busca-rapida" className="container mx-auto -mt-8 px-4">
          <h2 id="busca-rapida" className="sr-only">Busca rápida</h2>
          <form
            className="grid gap-3 rounded-2xl border-2 border-border bg-card p-4 shadow-elevated md:grid-cols-[1.4fr_1fr_1fr_auto]"
            onSubmit={(e) => e.preventDefault()}
          >
            <Field icon={MapPin} label="Para onde?" placeholder="Cidade, estado ou país" id="dest" />
            <Field icon={Calendar} label="Quando?" placeholder="Datas" id="when" />
            <Field icon={Users} label="Viajantes" placeholder="2 adultos" id="who" />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              Buscar
            </button>
          </form>
        </section>

        {/* PILARES */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Por que Viagem sem Barreiras</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Informação acessível, decisão confiante</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Pillar
              icon={Accessibility}
              title="Filtros que respeitam você"
              text="Filtros adaptáveis ao seu perfil: cadeirante, baixa visão, surdez, autismo, mobilidade reduzida e deficiências ocultas."
            />
            <Pillar
              icon={Star}
              title="Avaliações verificadas por PcD"
              text="Comentários de Pessoas com Deficiência destacados com o símbolo do girassol, com nota separada para acessibilidade."
            />
            <Pillar
              icon={ShieldCheck}
              title="Conformidade real"
              text="Navegação 100% por teclado, leitores de tela, alto contraste, ajuste de fonte e linguagem inclusiva."
            />
          </div>
        </section>

        {/* DESTINOS */}
        <section aria-labelledby="destinos" className="container mx-auto px-4 pb-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="destinos" className="text-3xl font-extrabold sm:text-4xl">Destinos acessíveis em destaque</h2>
              <p className="mt-2 text-muted-foreground">Selecionados pela equipe e avaliados pela comunidade.</p>
            </div>
            <Link to="/buscar" className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:inline-flex">
              Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <li key={d.id}>
                <Link
                  to="/buscar"
                  className="group block overflow-hidden rounded-2xl border-2 border-border bg-card transition hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={d.image}
                      alt={`Vista de ${d.name}, ${d.state}`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-bold text-foreground shadow-soft">
                      <Accessibility className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      {d.accessibilityScore.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{d.state}</p>
                    <p className="mt-0.5 text-lg font-extrabold">{d.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A partir de <span className="font-bold text-foreground">R$ {d.fromPrice}</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* SÍMBOLOS */}
        <section aria-labelledby="simbolos" className="bg-muted/40 py-20">
          <div className="container mx-auto px-4">
            <h2 id="simbolos" className="text-3xl font-extrabold sm:text-4xl">Símbolos que respeitamos</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Usamos a simbologia oficial reconhecida pela ONU e pela comunidade PcD para que cada pessoa se identifique.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <SymbolCard color="bg-sunflower" label="Girassol" desc="Deficiências ocultas (TEA, dor crônica, neurodivergência)" />
              <SymbolCard color="bg-success" label="Bengala verde" desc="Baixa visão" />
              <SymbolCard color="bg-background border-2 border-foreground" label="Bengala branca" desc="Cegueira" />
              <SymbolCard color="bg-destructive" label="Bengala vermelha e branca" desc="Surdocegueira" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  placeholder,
  id,
}: {
  icon: typeof Search;
  label: string;
  placeholder: string;
  id: string;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 rounded-xl border-2 border-input bg-background px-4 py-2.5 focus-within:border-primary">
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      <span className="flex flex-1 flex-col">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <input id={id} type="text" placeholder={placeholder} className="w-full bg-transparent text-base font-semibold outline-none placeholder:text-muted-foreground/70" />
      </span>
    </label>
  );
}

function Pillar({ icon: Icon, title, text }: { icon: typeof Accessibility; title: string; text: string }) {
  return (
    <article className="rounded-2xl border-2 border-border bg-card p-6 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </article>
  );
}

function SymbolCard({ color, label, desc }: { color: string; label: string; desc: string }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-5">
      <div className={`h-14 w-14 rounded-full ${color} shadow-soft`} aria-hidden="true" />
      <p className="mt-4 text-lg font-extrabold">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
