/**
 * Catálogo de produtos.
 *
 * TEMPORÁRIO: array estático em memória.
 * Quando o backend (Cloudflare Workers + D1) estiver rodando, as funções
 * abaixo devem chamar `${import.meta.env.VITE_API_URL}/api/products` em vez de
 * retornar este array.
 *
 * Convenção: preço em CENTAVOS (inteiro), nunca float.
 */

export const products = [
  {
    id: "1",
    slug: "camiseta-tech",
    name: "Camiseta Tech",
    priceCents: 9990,
    image: "https://picsum.photos/seed/camiseta-tech/600/600",
    description:
      "Camiseta confortável, leve e versátil para o dia a dia. Tecido com toque macio e secagem rápida.",
    category: "camisetas",
    categoryLabel: "Camisetas",
    stock: 10,
  },
  {
    id: "2",
    slug: "calca-performance",
    name: "Calça Performance",
    priceCents: 19990,
    image: "https://picsum.photos/seed/calca-performance/600/600",
    description:
      "Calça com caimento moderno e foco em conforto. Ideal para o trabalho e momentos de lazer.",
    category: "calcas",
    categoryLabel: "Calças",
    stock: 5,
  },
  {
    id: "3",
    slug: "moletom-classic",
    name: "Moletom Classic",
    priceCents: 24990,
    image: "https://picsum.photos/seed/moletom-classic/600/600",
    description:
      "Moletom flanelado por dentro, com capuz ajustável e bolso canguru. Perfeito para os dias frios.",
    category: "moletons",
    categoryLabel: "Moletons",
    stock: 8,
  },
  {
    id: "4",
    slug: "tenis-runner",
    name: "Tênis Runner",
    priceCents: 34990,
    image: "https://picsum.photos/seed/tenis-runner/600/600",
    description:
      "Tênis com solado em EVA e amortecimento responsivo. Cabedal respirável para uso diário.",
    category: "calcados",
    categoryLabel: "Calçados",
    stock: 12,
  },
  {
    id: "5",
    slug: "bone-aba-curva",
    name: "Boné Aba Curva",
    priceCents: 6990,
    image: "https://picsum.photos/seed/bone-aba-curva/600/600",
    description:
      "Boné de aba curva com fechamento ajustável. Material resistente e bordado discreto.",
    category: "acessorios",
    categoryLabel: "Acessórios",
    stock: 20,
  },
  {
    id: "6",
    slug: "camiseta-basica",
    name: "Camiseta Básica",
    priceCents: 5990,
    image: "https://picsum.photos/seed/camiseta-basica/600/600",
    description:
      "Camiseta básica em algodão, ideal para compor qualquer look. Disponível em várias cores.",
    category: "camisetas",
    categoryLabel: "Camisetas",
    stock: 25,
  },
];

/**
 * Busca produto por id ou slug.
 */
export function findProduct(idOrSlug) {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

/**
 * Lista produtos de uma categoria pelo slug.
 */
export function findByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug);
}
