import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
}