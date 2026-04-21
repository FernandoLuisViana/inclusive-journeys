import { Accessibility, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-foreground">
            <Accessibility className="h-5 w-5 text-primary" aria-hidden="true" />
            Viagem sem Barreiras
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Plataforma acadêmica (TCC) de turismo acessível para Pessoas com Deficiência, familiares e acompanhantes.
          </p>
        </div>
        <FooterCol title="Plataforma" links={["Como funciona", "Selo de acessibilidade", "Para parceiros"]} />
        <FooterCol title="Acessibilidade" links={["Conformidade WCAG 2.1 AA", "Símbolo do girassol", "Bengalas e cores"]} />
        <FooterCol title="Legal" links={["Termos de uso", "LGPD e privacidade", "Política de moderação"]} />
      </div>
      <div className="border-t border-border bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Viagem sem Barreiras — Projeto acadêmico de pós-graduação.</p>
          <p className="inline-flex items-center gap-1.5">
            Construído com <Heart className="h-3.5 w-3.5 text-destructive" aria-hidden="true" /> e foco em inclusão real.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-muted-foreground hover:text-primary hover:underline">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
