import MainLayout from "../layout/MainLayout";
import { products } from "../services/products";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { addItem } = useCart();

  return (
    <MainLayout>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/produto/${p.id}`}
            className="border p-2 block"
          >
            <img src={p.image} alt={p.name} />
            <h2>{p.name}</h2>
            <p>R$ {p.price}</p>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(p);
              }}
              className="bg-black text-white px-3 py-1 mt-2"
            >
              Adicionar
            </button>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}