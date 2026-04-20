/**
 * Chamadas à API de pedidos no backend (Cloudflare Worker).
 *
 * Base URL vem de `VITE_API_URL` em `.env` (ex.: `http://localhost:8787`).
 */

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8787";

/**
 * Cria um pedido e retorna o init_point do Mercado Pago (string).
 *
 * Payload esperado pelo backend:
 * {
 *   items:   [{ productId, qty }]
 *   buyer:   { name, email, phone }
 *   address: { cep, street, number, complement, city, state }
 * }
 *
 * Resposta do backend:
 * {
 *   orderId: string
 *   initPoint: string   // URL de redirect do Mercado Pago
 * }
 */
export async function createOrder(payload) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message ?? "Falha ao criar o pedido");
  }

  return response.json();
}

/**
 * Busca um pedido pelo id (usado na página de sucesso para ler status).
 */
export async function getOrder(orderId) {
  const response = await fetch(`${API_URL}/api/orders/${orderId}`);

  if (!response.ok) {
    throw new Error("Pedido não encontrado");
  }

  return response.json();
}
