import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useCart } from "../context/CartContext";

export default function Success() {
  const [params] = useSearchParams();
  const { clearCart } = useCart();

  // Mercado Pago retorna para /sucesso com ?payment_id=&status=&external_reference=
  const status = params.get("status");
  const externalReference = params.get("external_reference");

  useEffect(() => {
    // Limpa o carrinho quando o pagamento foi aprovado.
    if (status === "approved" || status === null) {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="text-3xl font-bold">Pedido realizado!</h1>

        {externalReference && (
          <p className="mt-4 text-gray-600">
            Número do pedido:{" "}
            <span className="font-mono font-semibold">{externalReference}</span>
          </p>
        )}

        {status && (
          <p className="mt-2 text-sm text-gray-500">
            Status do pagamento: <span className="font-medium">{status}</span>
          </p>
        )}

        <p className="mt-6 text-gray-600">
          Você receberá um e-mail de confirmação em breve. Obrigado pela
          compra!
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Continuar comprando
        </Link>
      </div>
    </MainLayout>
  );
}
