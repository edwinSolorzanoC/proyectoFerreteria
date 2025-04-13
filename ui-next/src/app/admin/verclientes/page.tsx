"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";

interface Cliente {
  id_cliente: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
}

export default function ClientesFrecuentes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCorreo, setFiltroCorreo] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/clientes")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener clientes");
        return res.json();
      })
      .then((data) => setClientes(Array.isArray(data) ? data : [data]))
      .catch((error) => {
        console.error("Error al conectar con el backend:", error);
        alert("Hubo un error al cargar los clientes.");
      });
  }, []);

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      cliente.correo.toLowerCase().includes(filtroCorreo.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Buscar Clientes Frecuentes</h1>

        <form className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 font-medium">Nombre del Cliente</label>
            <input
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Filtrar por nombre"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Correo</label>
            <input
              type="text"
              value={filtroCorreo}
              onChange={(e) => setFiltroCorreo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Filtrar por correo"
            />
          </div>
        </form>

        <h2 className="text-2xl font-semibold mb-4">Lista de Clientes Frecuentes</h2>

        <table className="min-w-full table-auto border-collapse">
          <thead className="text-white">
            <tr className="bg-green-800">
              <th className="px-4 py-2 border text-center">Nombre del Cliente</th>
              <th className="px-4 py-2 border text-center">Correo</th>
              <th className="px-4 py-2 border text-center">Número Telefónico</th>
              <th className="px-4 py-2 border text-center">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id_cliente} className="border-t">
                  <td className="text-center border px-4 py-2">{cliente.nombre}</td>
                  <td className="text-center border px-4 py-2">{cliente.correo}</td>
                  <td className="text-center border px-4 py-2">{cliente.telefono}</td>
                  <td className="text-center border px-4 py-2">{cliente.direccion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No se encontraron clientes con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
