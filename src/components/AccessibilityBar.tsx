import { useEffect, useState } from "react";
import { Accessibility, Type, Contrast, RotateCcw } from "lucide-react";

const STORAGE_KEY = "vsb-a11y";

type Prefs = { fontScale: number; highContrast: boolean };

const DEFAULT: Prefs = { fontScale: 1, highContrast: false };

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);

  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--app-font-size", `${16 * prefs.fontScale}px`);
    root.classList.toggle("high-contrast", prefs.highContrast);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const update = (patch: Partial<Prefs>) => setPrefs((p) => ({ ...p, ...patch }));

  return (
    <div className="border-b border-border bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2 text-sm">
        <a href="#main" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <div className="flex items-center gap-2 font-semibold">
          <Accessibility className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Acessibilidade</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => update({ fontScale: Math.max(0.875, prefs.fontScale - 0.125) })}
            className="rounded-md bg-primary-foreground/15 px-3 py-1.5 font-bold hover:bg-primary-foreground/25"
            aria-label="Diminuir tamanho da fonte"
          >
            A−
          </button>
          <span className="min-w-12 text-center font-semibold tabular-nums" aria-live="polite">
            {Math.round(prefs.fontScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => update({ fontScale: Math.min(1.5, prefs.fontScale + 0.125) })}
            className="rounded-md bg-primary-foreground/15 px-3 py-1.5 font-bold hover:bg-primary-foreground/25"
            aria-label="Aumentar tamanho da fonte"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => update({ highContrast: !prefs.highContrast })}
            aria-pressed={prefs.highContrast}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-foreground/15 px-3 py-1.5 font-semibold hover:bg-primary-foreground/25"
          >
            <Contrast className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Alto contraste</span>
          </button>
          <button
            type="button"
            onClick={() => setPrefs(DEFAULT)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-foreground/15 px-3 py-1.5 font-semibold hover:bg-primary-foreground/25"
            aria-label="Restaurar configurações de acessibilidade"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
