import MainLayout from "../layout/MainLayout";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem, updateQty, getTotal } = useCart();

  return (
    <MainLayout>
      <h1 className="text-2xl mb-4">Carrinho</h1>

      {cart.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="border p-4 mb-3">
              <h2 className="font-bold">{item.name}</h2>
              <p>R$ {item.price.toFixed(2)}</p>

              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  updateQty(item.id, Number(e.target.value))
                }
                className="border px-2 py-1 mt-2"
              />

              <button
                onClick={() => removeItem(item.id)}
                className="ml-3 text-red-600"
              >
                Remover
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">
            Total: R$ {getTotal().toFixed(2)}
          </h2>
        </>
      )}
    </MainLayout>
  );
}