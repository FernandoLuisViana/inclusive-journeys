import rio from "@/assets/dest-rio.jpg";
import gramado from "@/assets/dest-gramado.jpg";
import salvador from "@/assets/dest-salvador.jpg";
import foz from "@/assets/dest-foz.jpg";
import hotel1 from "@/assets/hotel-1.jpg";

export type AccessibilityFeature =
  | "rampa"
  | "cadeirante"
  | "elevador"
  | "banheiro-acessivel"
  | "piso-tatil"
  | "braile"
  | "libras"
  | "audiodescricao"
  | "cao-guia"
  | "sinalizacao-visual"
  | "atendimento-prioritario"
  | "estacionamento-pcd";

export const ACCESSIBILITY_LABELS: Record<AccessibilityFeature, string> = {
  rampa: "Rampa de acesso",
  cadeirante: "Acesso para cadeirante",
  elevador: "Elevador",
  "banheiro-acessivel": "Banheiro acessível",
  "piso-tatil": "Piso tátil",
  braile: "Sinalização em braile",
  libras: "Atendimento em Libras",
  audiodescricao: "Audiodescrição",
  "cao-guia": "Permite cão-guia",
  "sinalizacao-visual": "Sinalização visual reforçada",
  "atendimento-prioritario": "Atendimento prioritário",
  "estacionamento-pcd": "Estacionamento PcD",
};

export type Destination = {
  id: string;
  name: string;
  state: string;
  image: string;
  fromPrice: number;
  accessibilityScore: number;
  highlights: string[];
};

export const DESTINATIONS: Destination[] = [
  {
    id: "rio",
    name: "Rio de Janeiro",
    state: "RJ",
    image: rio,
    fromPrice: 890,
    accessibilityScore: 4.6,
    highlights: ["Praia de Copacabana com cadeira anfíbia", "Bondinho acessível", "Cristo com elevador panorâmico"],
  },
  {
    id: "gramado",
    name: "Gramado",
    state: "RS",
    image: gramado,
    fromPrice: 1240,
    accessibilityScore: 4.8,
    highlights: ["Calçadas niveladas no centro", "Mini Mundo acessível", "Audiodescrição no Snowland"],
  },
  {
    id: "salvador",
    name: "Salvador",
    state: "BA",
    image: salvador,
    fromPrice: 760,
    accessibilityScore: 4.2,
    highlights: ["Elevador Lacerda", "Praia do Porto da Barra adaptada", "Tour Pelourinho com guia em Libras"],
  },
  {
    id: "foz",
    name: "Foz do Iguaçu",
    state: "PR",
    image: foz,
    fromPrice: 1050,
    accessibilityScore: 4.9,
    highlights: ["Trilhas pavimentadas", "Cadeiras todo-terreno gratuitas", "Audiodescrição nas Cataratas"],
  },
];

export type Service = {
  id: string;
  type: "hospedagem" | "passagem" | "atracao" | "transporte" | "veiculo";
  title: string;
  destinationId: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  pcdReviewCount: number;
  description: string;
  features: AccessibilityFeature[];
};

export const SERVICES: Service[] = [
  {
    id: "h1",
    type: "hospedagem",
    title: "Hotel Acolher Copacabana",
    destinationId: "rio",
    image: hotel1,
    price: 480,
    rating: 4.8,
    reviewCount: 1284,
    pcdReviewCount: 312,
    description: "Quartos adaptados com box sem desnível, barras de apoio e camas em altura ajustável. Equipe treinada em Libras.",
    features: ["cadeirante", "rampa", "elevador", "banheiro-acessivel", "libras", "cao-guia", "atendimento-prioritario", "estacionamento-pcd"],
  },
  {
    id: "h2",
    type: "hospedagem",
    title: "Pousada Girassol Gramado",
    destinationId: "gramado",
    image: hotel1,
    price: 620,
    rating: 4.9,
    reviewCount: 542,
    pcdReviewCount: 189,
    description: "Pousada com cardápio em braile, sinalização tátil em todos os ambientes e suítes para deficiências ocultas (TEA).",
    features: ["cadeirante", "braile", "piso-tatil", "sinalizacao-visual", "cao-guia", "banheiro-acessivel"],
  },
  {
    id: "h3",
    type: "hospedagem",
    title: "Resort Aurora Salvador",
    destinationId: "salvador",
    image: hotel1,
    price: 390,
    rating: 4.5,
    reviewCount: 876,
    pcdReviewCount: 124,
    description: "Resort à beira-mar com cadeira anfíbia, piscina com elevador hidráulico e atividades adaptadas.",
    features: ["cadeirante", "rampa", "elevador", "banheiro-acessivel", "atendimento-prioritario"],
  },
  {
    id: "h4",
    type: "hospedagem",
    title: "Eco Lodge Cataratas",
    destinationId: "foz",
    image: hotel1,
    price: 540,
    rating: 4.7,
    reviewCount: 421,
    pcdReviewCount: 98,
    description: "Lodge com trilhas internas pavimentadas, cadeira todo-terreno gratuita e audiodescrição nos passeios.",
    features: ["cadeirante", "rampa", "audiodescricao", "libras", "cao-guia", "banheiro-acessivel", "estacionamento-pcd"],
  },
];

export type Review = {
  id: string;
  serviceId: string;
  author: string;
  isPcD: boolean;
  pcdType?: string;
  rating: number;
  date: string;
  comment: string;
  accessibilityRating: number;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    serviceId: "h1",
    author: "Marina S.",
    isPcD: true,
    pcdType: "Cadeirante",
    rating: 5,
    accessibilityRating: 5,
    date: "Mar 2026",
    comment: "Quarto realmente adaptado, com espaço de manobra de sobra. Recepção atendeu em Libras meu acompanhante surdo. Voltarei!",
  },
  {
    id: "r2",
    serviceId: "h1",
    author: "Carlos P.",
    isPcD: false,
    rating: 4,
    accessibilityRating: 5,
    date: "Fev 2026",
    comment: "Levei minha mãe que usa andador. Tudo muito bem sinalizado e equipe atenciosa.",
  },
  {
    id: "r3",
    serviceId: "h1",
    author: "Júlia R.",
    isPcD: true,
    pcdType: "Baixa visão",
    rating: 5,
    accessibilityRating: 5,
    date: "Jan 2026",
    comment: "Cardápio em braile e contraste excelente nos corredores. Me senti independente o tempo todo.",
  },
];
