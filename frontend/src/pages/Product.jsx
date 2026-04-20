import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useCart } from "../context/CartContext";
import { findProduct } from "../services/products";
import { formatMoney } from "../utils/money";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = findProduct(id);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <MainLayout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          <p className="mt-2 text-gray-600">
            Esse produto não existe ou foi removido.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded bg-black px-4 py-2 text-sm text-white"
          >
            Voltar para a loja
          </Link>
        </div>
      </MainLayout>
    );
  }

  function handleQtyChange(e) {
    const value = Number(e.target.value);
    if (value < 1) return setQty(1);
    if (value > product.stock) return setQty(product.stock);
    setQty(value);
  }

  function handleAddToCart() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const outOfStock = product.stock <= 0;

  return (
    <MainLayout>
      <Link to="/" className="text-sm text-gray-500 hover:underline">
        ← Voltar para a loja
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg border bg-white object-cover"
          />
        </div>

        <div>
          <Link
            to={`/categoria/${product.category}`}
            className="text-sm uppercase tracking-wide text-gray-500 hover:underline"
          >
            {product.categoryLabel ?? product.category}
          </Link>

          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-3xl font-semibold">
            {formatMoney(product.priceCents)}
          </p>

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Descrição
            </h2>
            <p className="mt-2 leading-relaxed text-gray-700">
              {product.description}
            </p>
          </section>

          <p className="mt-6 text-sm text-gray-500">
            {outOfStock
              ? "Produto indisponível no momento."
              : `Estoque disponível: ${product.stock}`}
          </p>

          {!outOfStock && (
            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="qty" className="sr-only">
                Quantidade
              </label>
              <input
                id="qty"
                type="number"
                min="1"
                max={product.stock}
                value={qty}
                onChange={handleQtyChange}
                className="w-20 rounded border px-3 py-2"
              />

              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded bg-black px-5 py-2 font-medium text-white transition hover:bg-gray-800"
              >
                Adicionar ao carrinho
              </button>

              {added && (
                <span className="text-sm text-green-700">Adicionado!</span>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
