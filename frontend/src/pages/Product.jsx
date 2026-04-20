import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { products } from "../services/products";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const product = useMemo(() => {
    return products.find((item) => item.id === id);
  }, [id]);

  function handleQtyChange(e) {
    const value = Number(e.target.value);

    if (value < 1) {
      setQty(1);
      return;
    }

    if (value > product.stock) {
      setQty(product.stock);
      return;
    }

    setQty(value);
  }

  function handleAddToCart() {
    for (let i = 0; i < qty; i += 1) {
      addItem(product);
    }
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="py-10">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          <p className="mt-2 text-gray-600">
            Esse produto não existe ou foi removido.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg border"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-semibold">
            R$ {product.price.toFixed(2)}
          </p>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-4 text-sm text-gray-500">
            Estoque disponível: {product.stock}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <input
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
              className="rounded bg-black px-4 py-2 text-white"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}