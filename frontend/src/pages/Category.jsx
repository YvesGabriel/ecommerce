import { Link, useParams } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ProductCard from "../components/ProductCard";
import { findByCategory, products } from "../services/products";

export default function Category() {
  const { slug } = useParams();
  const items = findByCategory(slug);
  const label = items[0]?.categoryLabel ?? slug;

  return (
    <MainLayout>
      <section className="mb-8">
        <Link to="/" className="text-sm text-gray-500 hover:underline">
          ← Voltar para a loja
        </Link>
        <h1 className="mt-2 text-3xl font-bold capitalize">{label}</h1>
        <p className="mt-1 text-gray-600">
          {items.length} {items.length === 1 ? "produto" : "produtos"}
        </p>
      </section>

      {items.length === 0 ? (
        <div className="rounded-lg border bg-white p-10 text-center">
          <p className="text-gray-600">
            Nenhum produto nesta categoria ainda.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded bg-black px-4 py-2 text-sm text-white"
          >
            Ver todos os produtos ({products.length})
          </Link>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </MainLayout>
  );
}
