/**
 * Formata um valor monetário em centavos para "R$ X,XX".
 * Sempre trabalhar com inteiros em centavos para evitar erros de float.
 *
 * @param {number} cents - Valor em centavos (ex.: 9990 → "R$ 99,90")
 * @returns {string}
 */
export function formatMoney(cents) {
  if (typeof cents !== "number" || Number.isNaN(cents)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

/**
 * Converte preço em reais (float) para centavos (int).
 * Útil enquanto a base ainda tem preços como float.
 *
 * @param {number} reais
 * @returns {number}
 */
export function reaisToCents(reais) {
  return Math.round(Number(reais) * 100);
}
