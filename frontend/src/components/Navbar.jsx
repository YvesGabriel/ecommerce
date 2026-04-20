import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { products } from "../services/products";

/**
 * Navbar principal do site.
 * Mostra logo, links de categoria (derivados dos produtos disponíveis),
 * link do admin e ícone do carrinho com contador de itens.
 */
export default function Navbar() {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Enquanto não vem do backend, categorias são derivadas dos produtos.
  const categories = useMemo(() => {
    const unique = new Map();
    products.forEach((p) => {
      if (!unique.has(p.category)) {
        unique.set(p.category, {
          slug: p.category,
          label: p.categoryLabel ?? capitalize(p.category),
        });
      }
    });
    return Array.from(unique.values());
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition hover:text-black ${
      isActive ? "text-black" : "text-gray-600"
    }`;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold">
          Minha Loja
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Início
          </NavLink>
          {categories.map((cat) => (
            <NavLink
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              className={linkClass}
            >
              {cat.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/carrinho"
            className="relative rounded px-3 py-2 text-sm font-medium hover:bg-gray-100"
            aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
          >
            Carrinho
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rounded px-3 py-2 text-sm md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <nav className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              Início
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
