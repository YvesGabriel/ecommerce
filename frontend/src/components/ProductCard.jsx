import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatMoney } from "../utils/money";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border bg-white transition hover:shadow-md">
      <Link to={`/produto/${product.slug ?? product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          to={`/produto/${product.slug ?? product.id}`}
          className="text-lg font-semibold hover:underline"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xl font-bold">
          {formatMoney(product.priceCents)}
        </p>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-auto rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
