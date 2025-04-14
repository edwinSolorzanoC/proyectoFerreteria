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

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
  }>({ nombre: "", correo: "", telefono: "", direccion: "" });

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

  const handleEditar = (cliente: Cliente) => {
    setEditandoId(cliente.id_cliente);
    setEditValues({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
  };

  const handleGuardar = async (id: number) => {
    const updatedClientes = clientes.map((c) =>
      c.id_cliente === id
        ? {
            ...c,
            nombre: editValues.nombre,
            correo: editValues.correo,
            telefono: editValues.telefono,
            direccion: editValues.direccion,
          }
        : c
    );
    setClientes(updatedClientes);

    const clienteActualizado = updatedClientes.find((c) => c.id_cliente === id);
    await handleUpdate(clienteActualizado);
    setEditandoId(null);
  };

  const handleUpdate = async (cliente: Cliente | undefined) => {
    if (!cliente) return;
    try {
      const response = await fetch(`http://localhost:5000/api/clientes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cliente,
          nombre: cliente.nombre,
          correo: cliente.correo,
          telefono: cliente.telefono,
          direccion: cliente.direccion,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      cliente.correo.toLowerCase().includes(filtroCorreo.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">
          Buscar Clientes Frecuentes
        </h1>

        <form className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 font-medium">
              Nombre del Cliente
            </label>
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

        <h2 className="text-2xl font-semibold mb-4">
          Lista de Clientes Frecuentes
        </h2>

        <table className="min-w-full table-auto border-collapse">
          <thead className="text-white">
            <tr className="bg-blue-900">
              <th className="px-4 py-2 border text-center">Nombre</th>
              <th className="px-4 py-2 border text-center">Correo</th>
              <th className="px-4 py-2 border text-center">Telefono</th>
              <th className="px-4 py-2 border text-center">Direccion</th>
              <th className="px-4 py-2 border text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id_cliente} className={`border-t`}>
                  <td className="text-center border px-4 py-2">
                    {editandoId === cliente.id_cliente ? (
                      <input
                        value={editValues.nombre}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            nombre: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 text-black"
                      />
                    ) : (
                      `${cliente.nombre}`
                    )}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {editandoId === cliente.id_cliente ? (
                      <input
                        value={editValues.correo}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            correo: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 text-black"
                      />
                    ) : (
                      `${cliente.correo}`
                    )}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {editandoId === cliente.id_cliente ? (
                      <input
                        value={editValues.telefono}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            telefono: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 text-black"
                      />
                    ) : (
                      cliente.telefono
                    )}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {editandoId === cliente.id_cliente ? (
                      <input
                        value={editValues.direccion}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            direccion: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 text-black"
                      />
                    ) : (
                      cliente.direccion
                    )}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {editandoId === cliente.id_cliente ? (
                      <button
                        onClick={() => handleGuardar(cliente.id_cliente)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditar(cliente)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                    )}
                  </td>
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
