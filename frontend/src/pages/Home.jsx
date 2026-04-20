import MainLayout from "../layout/MainLayout";
import ProductCard from "../components/ProductCard";
import { products } from "../services/products";

export default function Home() {
  return (
    <MainLayout>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Destaques</h1>
        <p className="mt-1 text-gray-600">
          Confira os produtos mais recentes da loja.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </MainLayout>
  );
}
