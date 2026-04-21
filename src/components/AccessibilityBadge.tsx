import {
  Accessibility,
  Ear,
  Eye,
  Dog,
  ParkingSquare,
  ArrowUpDown,
  Bath,
  Languages,
  Volume2,
  Footprints,
  Sparkles,
  Star,
} from "lucide-react";
import { ACCESSIBILITY_LABELS, type AccessibilityFeature } from "@/lib/mock-data";

const ICONS: Record<AccessibilityFeature, typeof Accessibility> = {
  cadeirante: Accessibility,
  rampa: ArrowUpDown,
  elevador: ArrowUpDown,
  "banheiro-acessivel": Bath,
  "piso-tatil": Footprints,
  braile: Eye,
  libras: Languages,
  audiodescricao: Volume2,
  "cao-guia": Dog,
  "sinalizacao-visual": Sparkles,
  "atendimento-prioritario": Star,
  "estacionamento-pcd": ParkingSquare,
};

export function AccessibilityBadge({ feature, size = "md" }: { feature: AccessibilityFeature; size?: "sm" | "md" }) {
  const Icon = ICONS[feature] ?? Accessibility;
  const label = ACCESSIBILITY_LABELS[feature];
  const sizes = size === "sm" ? "px-2 py-1 text-xs gap-1" : "px-3 py-1.5 text-sm gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-secondary bg-secondary text-secondary-foreground font-semibold ${sizes}`}
      title={label}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export function PcdBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-sunflower px-2.5 py-1 text-xs font-bold text-sunflower-foreground"
      title="Avaliação verificada de Pessoa com Deficiência"
    >
      <Ear className="h-3 w-3" aria-hidden="true" />
      Avaliado por PcD
    </span>
  );
}
