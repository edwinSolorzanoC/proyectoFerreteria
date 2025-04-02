"use client";
// app/components/Header.tsx
import Link from "next/link";  // Importamos Link para la navegación interna


import { useState } from "react"; 


export default function Header() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Función para alternar el estado del dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <header className="bg-[#1D3557] text-white p-4">
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
          <button onClick={toggleDropdown}  className="hover:text-gray-300">
            Inventario 
          </button>
          
          
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

           {/* Dropdown Inventario */}
          <div className="relative">
            {isDropdownOpen && (
              <div className="text-black absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <Link
                  href="/productos/registrar"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Registrar Productos
                </Link>
                <Link
                  href="/productos/ver"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Ver Inventario
                </Link>
                <Link
                  href="/productos/editar"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Editar Inventario
                </Link>
              </div>
            )}
          </div>
          
        </nav>
      </div>
    </header>
  );
}