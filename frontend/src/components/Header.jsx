import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 shadow flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Minha Loja
      </Link>

      <Link to="/carrinho">Carrinho</Link>
    </header>
  );
}