// app/components/Header.tsx
import Link from "next/link";  // Importamos Link para la navegación interna

export default function Header() {
  return (
    <header className="bg-gray-200 text-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            FerreMax
          </Link>
        </div>

        {/* Navegación */}
        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-gray-300">
            Inventario
          </Link>
          <Link href="/carrito" className="hover:text-gray-300">
            Facturacion
          </Link>
          <Link href="/contacto" className="hover:text-gray-300">
            Clientes/Proveedores
          </Link>
          <Link href="/contacto" className="hover:text-gray-300">
            Reportes/Estadisticas
          </Link>
          <Link href="/contacto" className="hover:text-gray-300">
            Ordenes
          </Link>
        </nav>
      </div>
    </header>
  );
}
