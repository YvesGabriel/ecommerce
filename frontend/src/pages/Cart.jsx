import { Link } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useCart } from "../context/CartContext";
import { formatMoney } from "../utils/money";

export default function Cart() {
  const { cart, removeItem, updateQty, clearCart, getSubtotal } = useCart();

  if (cart.length === 0) {
    return (
      <MainLayout>
        <h1 className="text-3xl font-bold">Carrinho</h1>
        <div className="mt-6 rounded-lg border bg-white p-10 text-center">
          <p className="text-gray-600">Seu carrinho está vazio.</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded bg-black px-4 py-2 text-sm text-white"
          >
            Continuar comprando
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Carrinho</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-600 hover:underline"
        >
          Limpar carrinho
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border bg-white p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded border object-cover"
              />

              <div className="flex flex-1 flex-col">
                <Link
                  to={`/produto/${item.slug ?? item.id}`}
                  className="font-semibold hover:underline"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {formatMoney(item.priceCents)} cada
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <label htmlFor={`qty-${item.id}`} className="sr-only">
                    Quantidade
                  </label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min="1"
                    max={item.stock ?? undefined}
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item.id, Number(e.target.value))
                    }
                    className="w-20 rounded border px-2 py-1"
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>

              <p className="self-start font-semibold">
                {formatMoney(item.priceCents * item.qty)}
              </p>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-lg border bg-white p-4">
          <h2 className="text-lg font-semibold">Resumo</h2>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatMoney(getSubtotal())}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Frete</span>
            <span>Calculado no checkout</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatMoney(getSubtotal())}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded bg-black px-4 py-3 text-center font-medium text-white transition hover:bg-gray-800"
          >
            Finalizar compra
          </Link>

          <Link
            to="/"
            className="mt-2 block rounded border px-4 py-2 text-center text-sm hover:bg-gray-50"
          >
            Continuar comprando
          </Link>
        </aside>
      </div>
    </MainLayout>
  );
}
