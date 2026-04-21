import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Mail, Lock, Accessibility, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/conta")({
  component: ContaPage,
  head: () => ({
    meta: [
      { title: "Entrar / Cadastrar — Viagem sem Barreiras" },
      { name: "description", content: "Crie sua conta e receba sugestões personalizadas de acessibilidade." },
    ],
  }),
});

const TYPES = [
  "Mobilidade reduzida",
  "Cadeirante",
  "Baixa visão",
  "Cegueira",
  "Surdez",
  "Surdocegueira",
  "TEA / Deficiência oculta",
];

function ContaPage() {
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [pcd, setPcd] = useState<Set<string>>(new Set());
  const togglePcd = (t: string) =>
    setPcd((p) => {
      const n = new Set(p);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main" className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="seguranca">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Sua conta</p>
          <h1 id="seguranca" className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Bem-vindo(a) à comunidade Viagem sem Barreiras
          </h1>
          <p className="mt-3 text-muted-foreground">
            Informar uma deficiência é totalmente <span className="font-bold text-foreground">opcional</span> e nunca exige
            comprovação médica. Os dados são usados exclusivamente para personalizar sua experiência e aplicar filtros — em
            conformidade com a LGPD.
          </p>
          <div className="mt-6 space-y-3">
            <Bullet icon={ShieldCheck} text="Conformidade total com a LGPD: consentimento explícito e minimização de dados." />
            <Bullet icon={Accessibility} text="Filtros adaptados ao seu perfil em todas as buscas." />
            <Bullet icon={User} text="Cadastro de acompanhantes para viagens em grupo." />
          </div>
        </section>

        <section aria-labelledby="form" className="rounded-2xl border-2 border-border bg-card p-6 shadow-soft">
          <div className="flex rounded-xl bg-muted p-1">
            {(["signup", "login"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  tab === t ? "bg-background text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "signup" ? "Criar conta" : "Entrar"}
              </button>
            ))}
          </div>
          <h2 id="form" className="sr-only">Formulário de {tab === "signup" ? "cadastro" : "login"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Protótipo: cadastro simulado.");
            }}
            className="mt-6 space-y-4"
          >
            {tab === "signup" && (
              <FormField id="nome" label="Nome completo" type="text" icon={User} required />
            )}
            <FormField id="email" label="E-mail" type="email" icon={Mail} required />
            <FormField id="senha" label="Senha" type="password" icon={Lock} required />

            {tab === "signup" && (
              <fieldset>
                <legend className="text-sm font-bold">
                  Você se identifica com algum tipo de deficiência? <span className="font-normal text-muted-foreground">(opcional)</span>
                </legend>
                <p className="mt-1 text-xs text-muted-foreground">Selecione todos que se aplicam. Não exige comprovação médica.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TYPES.map((t) => {
                    const active = pcd.has(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => togglePcd(t)}
                        aria-pressed={active}
                        className={`rounded-full border-2 px-3 py-1.5 text-sm font-bold transition ${
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
            )}

            {tab === "signup" && (
              <label className="flex items-start gap-2.5 text-sm">
                <input type="checkbox" required className="mt-1 h-5 w-5 accent-[var(--color-primary)]" />
                <span className="text-muted-foreground">
                  Concordo com a <a href="#" className="font-bold text-primary underline">Política de Privacidade</a> e com o uso
                  dos meus dados conforme a LGPD.
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-5 py-3.5 font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              {tab === "signup" ? "Criar minha conta" : "Entrar"}
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FormField({
  id,
  label,
  type,
  icon: Icon,
  required,
}: {
  id: string;
  label: string;
  type: string;
  icon: typeof User;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {label} {required && <span className="text-destructive" aria-label="obrigatório">*</span>}
      </label>
      <div className="mt-1.5 flex items-center gap-3 rounded-xl border-2 border-input bg-background px-4 py-3 focus-within:border-primary">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        <input id={id} type={type} required={required} className="w-full bg-transparent font-semibold outline-none" />
      </div>
    </div>
  );
}

function Bullet({ icon: Icon, text }: { icon: typeof User; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border-2 border-border bg-card p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <p className="text-sm text-foreground/90">{text}</p>
    </div>
  );
}
