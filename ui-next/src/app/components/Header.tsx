"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdownMenu = () => setDropdownOpen(!dropdownOpen);
  const { user, isLoading } = useUser();

  // Cierra el dropdown si haces clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInside = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );
      if (!clickedInside) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <header className="bg-[#1D3557] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            FerreMax
          </Link>
        </div>

        <nav className="flex items-center space-x-4 relative">
          {!isLoading && (
            <Link href={!isLoading && user ? "/" : "/api/auth/login" } className="hover:text-gray-300">
              {!isLoading && user ? "Inicio" : "Login"}
            </Link>
          )}

          {/* Inventario */}
          {!isLoading && user && (
            <div className="flex items-center space-x-4 relative">
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current["inventario"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("inventario")}
                  className="hover:text-gray-300"
                >
                  Inventario
                </button>
                {openDropdown === "inventario" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                    <Link
                      href="/admin/productos/registrar"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Registrar producto
                    </Link>
                    <Link
                      href="/admin/productos/ver"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Ver/Editar inventario
                    </Link>
                  </div>
                )}
              </div>

              {/* Clientes */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current["clientes"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("clientes")}
                  className="hover:text-gray-300"
                >
                  Clientes
                </button>
                {openDropdown === "clientes" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                    <Link
                      href="/admin/clientes/registrarclientes"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Registrar Clientes
                    </Link>
                    <Link
                      href="/admin/clientes/ver"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      por_terminar_2
                    </Link>
                  </div>
                )}
              </div>

              {/* Facturación */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current["facturacion"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("facturacion")}
                  className="hover:text-gray-300"
                >
                  Facturación
                </button>
                {openDropdown === "facturacion" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                    <Link
                      href="/admin/facturas/generar"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Facturar
                    </Link>
                    <Link
                      href="/admin/facturas/verfacturas"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Ver Facturas
                    </Link>
                  </div>
                )}
              </div>

              {/* Proveedores */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current["proveedores"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("proveedores")}
                  className="hover:text-gray-300"
                >
                  Proveedores
                </button>
                {openDropdown === "proveedores" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                    <Link
                      href="/admin/proveedor/registrar"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Registrar proveedor
                    </Link>
                    <Link
                      href="/admin/proveedor/ver"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Ver/Editar proveedores
                    </Link>
                  </div>
                )}
              </div>

              {/* Estadísticas */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current["estadisticas"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("estadisticas")}
                  className="hover:text-gray-300"
                >
                  Estadísticas
                </button>
                {openDropdown === "estadisticas" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                    <Link
                      href="/admin/estadisticas/ventas"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      por_terminar_1
                    </Link>
                    <Link
                      href="/admin/estadisticas/inventario"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      por_terminar_2
                    </Link>
                  </div>
                )}
              </div>

              {/* Órdenes */}
              <div
                className="relative"
                ref={(el) => (dropdownRefs.current["ordenes"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("ordenes")}
                  className="hover:text-gray-300"
                >
                  Órdenes
                </button>
                {openDropdown === "ordenes" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                    <Link
                      href="/admin/ordenes/pendientes"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      por_terminar_1
                    </Link>
                    <Link
                      href="/admin/ordenes/historial"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      por_terminar_2
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isLoading && user && (
            <>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdownMenu}
                  className="flex items-center focus:outline-none mt-2 md:mt-0"
                >
                  <img
                    src={user.picture ?? ""}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-20">
                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                      {user.name}
                    </div>
                    <Link
                      href="/api/auth/logout"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      cerrar sesion
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
