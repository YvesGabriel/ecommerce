import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  /**
   * Adiciona N unidades do produto ao carrinho.
   * Snapshot dos campos relevantes: id, slug, name, priceCents, image, stock.
   */
  function addItem(product, qty = 1) {
    if (!product || qty < 1) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const nextQty = (existing?.qty ?? 0) + qty;
      const cappedQty =
        typeof product.stock === "number"
          ? Math.min(nextQty, product.stock)
          : nextQty;

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: cappedQty } : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          priceCents: product.priceCents,
          image: product.image,
          stock: product.stock,
          qty: cappedQty,
        },
      ];
    });
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const capped =
          typeof item.stock === "number" ? Math.min(qty, item.stock) : qty;
        return { ...item, qty: capped };
      })
    );
  }

  function clearCart() {
    setCart([]);
  }

  function getSubtotal() {
    return cart.reduce((total, item) => total + item.priceCents * item.qty, 0);
  }

  function getItemCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de <CartProvider>");
  }
  return ctx;
}
