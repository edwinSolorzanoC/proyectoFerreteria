"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

        <nav className="flex space-x-4 relative">
          <Link href="/" className="hover:text-gray-300">Inicio</Link>

          {/* Inventario */}
          <div className="relative" ref={(el) => (dropdownRefs.current["inventario"] = el)}>
            <button onClick={() => toggleDropdown("inventario")} className="hover:text-gray-300">
              Inventario
            </button>
            {openDropdown === "inventario" && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                <Link href="/productos/registrar" className="block px-4 py-2 hover:bg-gray-100">
                  Registrar producto
                </Link>
                <Link href="/productos/ver" className="block px-4 py-2 hover:bg-gray-100">
                  Ver/Editar inventario
                </Link>
                
              </div>
            )}
          </div>

          {/* Clientes */}
          <div className="relative" ref={(el) => (dropdownRefs.current["clientes"] = el)}>
            <button onClick={() => toggleDropdown("clientes")} className="hover:text-gray-300">
              Clientes
            </button>
            {openDropdown === "clientes" && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                <Link href="/clientes/registrarclientes" className="block px-4 py-2 hover:bg-gray-100">
                Registrar Clientes
                </Link>
                <Link href="/clientes/ver" className="block px-4 py-2 hover:bg-gray-100">
                por_terminar_2
                </Link>
              </div>
            )}
          </div>

          {/* Facturación */}
          <div className="relative" ref={(el) => (dropdownRefs.current["facturacion"] = el)}>
            <button onClick={() => toggleDropdown("facturacion")} className="hover:text-gray-300">
              Facturación
            </button>
            {openDropdown === "facturacion" && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                <Link href="/facturacion/nueva" className="block px-4 py-2 hover:bg-gray-100">
                por_terminar_1
                </Link>
                <Link href="/facturacion/historial" className="block px-4 py-2 hover:bg-gray-100">
                por_terminar_2
                </Link>
              </div>
            )}
          </div>

          {/* Proveedores */}
          <div className="relative" ref={(el) => (dropdownRefs.current["proveedores"] = el)}>
            <button onClick={() => toggleDropdown("proveedores")} className="hover:text-gray-300">
              Proveedores
            </button>
            {openDropdown === "proveedores" && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                <Link href="/proveedor/registrar" className="block px-4 py-2 hover:bg-gray-100">
                  Registrar proveedor
                </Link>
                <Link href="/proveedor/ver" className="block px-4 py-2 hover:bg-gray-100">
                  Ver/Editar proveedores
                </Link>
              </div>
            )}
          </div>

          {/* Estadísticas */}
          <div className="relative" ref={(el) => (dropdownRefs.current["estadisticas"] = el)}>
            <button onClick={() => toggleDropdown("estadisticas")} className="hover:text-gray-300">
              Estadísticas
            </button>
            {openDropdown === "estadisticas" && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                <Link href="/estadisticas/ventas" className="block px-4 py-2 hover:bg-gray-100">
                  por_terminar_1
                </Link>
                <Link href="/estadisticas/inventario" className="block px-4 py-2 hover:bg-gray-100">
                por_terminar_2
                </Link>
              </div>
            )}
          </div>

          {/* Órdenes */}
          <div className="relative" ref={(el) => (dropdownRefs.current["ordenes"] = el)}>
            <button onClick={() => toggleDropdown("ordenes")} className="hover:text-gray-300">
              Órdenes
            </button>
            {openDropdown === "ordenes" && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black">
                <Link href="/ordenes/pendientes" className="block px-4 py-2 hover:bg-gray-100">
                por_terminar_1
                </Link>
                <Link href="/ordenes/historial" className="block px-4 py-2 hover:bg-gray-100">
                por_terminar_2
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
