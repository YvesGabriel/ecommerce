import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orders";
import { formatMoney } from "../utils/money";

const SHIPPING_CENTS = 1990; // mock fixo até calcular frete real

const initialForm = {
  // contato
  name: "",
  email: "",
  phone: "",
  // endereço
  cep: "",
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getSubtotal } = useCart();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const subtotal = getSubtotal();
  const total = subtotal + (cart.length > 0 ? SHIPPING_CENTS : 0);

  if (cart.length === 0) {
    return (
      <MainLayout>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-6 rounded-lg border bg-white p-10 text-center">
          <p className="text-gray-600">Carrinho vazio.</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded bg-black px-4 py-2 text-sm text-white"
          >
            Voltar para a loja
          </Link>
        </div>
      </MainLayout>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Informe seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "E-mail inválido.";
    if (form.phone.replace(/\D/g, "").length < 10)
      next.phone = "Telefone inválido.";

    if (form.cep.replace(/\D/g, "").length !== 8) next.cep = "CEP inválido.";
    if (!form.street.trim()) next.street = "Informe a rua.";
    if (!form.number.trim()) next.number = "Informe o número.";
    if (!form.city.trim()) next.city = "Informe a cidade.";
    if (form.state.length !== 2)
      next.state = "Informe a UF (2 letras).";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const { initPoint } = await createOrder({
        items: cart.map((item) => ({ productId: item.id, qty: item.qty })),
        buyer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
        address: {
          cep: form.cep.replace(/\D/g, ""),
          street: form.street.trim(),
          number: form.number.trim(),
          complement: form.complement.trim(),
          city: form.city.trim(),
          state: form.state.trim().toUpperCase(),
        },
      });

      // Mercado Pago Checkout Pro — redirecionamos para o init_point.
      if (initPoint) {
        window.location.href = initPoint;
      } else {
        // Fallback: backend ainda não configurado → vai para /sucesso (mock).
        navigate("/sucesso");
      }
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <MainLayout>
      <Link to="/carrinho" className="text-sm text-gray-500 hover:underline">
        ← Voltar para o carrinho
      </Link>

      <h1 className="mt-2 text-3xl font-bold">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <section className="rounded-lg border bg-white p-4">
            <h2 className="text-lg font-semibold">Contato</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Nome completo"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                className="sm:col-span-2"
              />
              <Field
                label="E-mail"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Field
                label="Telefone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="(11) 99999-9999"
              />
            </div>
          </section>

          <section className="rounded-lg border bg-white p-4">
            <h2 className="text-lg font-semibold">Endereço de entrega</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-6">
              <Field
                label="CEP"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                error={errors.cep}
                className="sm:col-span-2"
                placeholder="00000-000"
              />
              <Field
                label="Rua"
                name="street"
                value={form.street}
                onChange={handleChange}
                error={errors.street}
                className="sm:col-span-4"
              />
              <Field
                label="Número"
                name="number"
                value={form.number}
                onChange={handleChange}
                error={errors.number}
                className="sm:col-span-2"
              />
              <Field
                label="Complemento"
                name="complement"
                value={form.complement}
                onChange={handleChange}
                className="sm:col-span-4"
              />
              <Field
                label="Cidade"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
                className="sm:col-span-4"
              />
              <Field
                label="UF"
                name="state"
                value={form.state}
                onChange={handleChange}
                error={errors.state}
                className="sm:col-span-2"
                maxLength={2}
              />
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border bg-white p-4">
          <h2 className="text-lg font-semibold">Resumo do pedido</h2>

          <ul className="mt-4 space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 text-sm"
              >
                <span>
                  {item.qty}× {item.name}
                </span>
                <span className="font-medium">
                  {formatMoney(item.priceCents * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Frete</span>
            <span>{formatMoney(SHIPPING_CENTS)}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Processando..." : "Pagar com Mercado Pago"}
          </button>

          {submitError && (
            <p className="mt-3 text-sm text-red-600">{submitError}</p>
          )}

          <p className="mt-3 text-xs text-gray-500">
            Você será redirecionado para o Mercado Pago para concluir o
            pagamento (Pix, boleto ou cartão).
          </p>
        </aside>
      </form>
    </MainLayout>
  );
}

function Field({
  label,
  name,
  error,
  className = "",
  type = "text",
  ...rest
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        type={type}
        {...rest}
        className={`mt-1 w-full rounded border px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
