"use client";

import Header from "../../../components/Header";
import React, { useEffect, useState } from "react";

interface ProductoApi {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad_stock: number;
  stock_minimo: number;
  id_proveedor: number;
  desactivado?: boolean;
}

export default function VerProducto() {
  const [productos, setProductos] = useState<ProductoApi[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    precio: string;
    cantidad: string;
  }>({ precio: "", cantidad: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then((response) => response.json())
      .then((data) => {
        const datos = Array.isArray(data) ? data : [data];

        const productosConEstado = datos.map((p) => ({
          ...p,
          desactivado: false,
        }));
        setProductos(productosConEstado);
      })
      .catch((error) => {
        console.error("Error al conectar con la API:", error);
      });
  }, []);

  const handleEditar = (producto: ProductoApi) => {
    setEditandoId(producto.id_producto);
    setEditValues({
      precio: producto.precio.toString(),
      cantidad: producto.cantidad_stock.toString(),
    });
  };

  const handleGuardar = async (id: number) => {
    const precioValido = /^[0-9]+(\.[0-9]{1,2})?$/.test(editValues.precio);
    const cantidadValida = /^\d+$/.test(editValues.cantidad);

    if (!precioValido || !cantidadValida) {
      alert("Precio y cantidad deben ser valores numéricos válidos.");
      return;
    }
    const updatedProductos = productos.map((p) =>
      p.id_producto === id
        ? {
            ...p,
            precio: parseFloat(editValues.precio),
            cantidad_stock: parseInt(editValues.cantidad),
          }
        : p
    );
    setProductos(updatedProductos);

    const productoActualizado = updatedProductos.find((p) => p.id_producto === id);
    await handleUpdate(productoActualizado);
    setEditandoId(null);
  };

  const handleUpdate = async (producto: ProductoApi | undefined) => {
    if (!producto) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/productos`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...producto,
            precio: producto.precio,
            cantidad_stock: producto.cantidad_stock,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  const handleDesactivar = async (id: number) => {
    setProductos((prev) =>
      prev.map((p) => (p.id_producto === id ? { ...p, desactivado: true } : p))
    ); 
  };
  const activos = productos.filter((p) => !p.desactivado);
  const desactivados = productos.filter((p) => p.desactivado);

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Registro de Productos</h1>

        <table className="min-w-full table-auto border-collapse">
          <thead className="text-white">
            <tr className="bg-blue-900">
              <th className="px-4 py-2 border text-center">Nombre</th>
              <th className="px-4 py-2 border text-center">Precio</th>
              <th className="px-4 py-2 border text-center">Cantidad</th>
              <th className="px-4 py-2 border text-center">Proveedor</th>
              <th className="px-4 py-2 border text-center">Acciones</th>
              <th className="px-4 py-2 border text-center">Estado</th>
            </tr>
          </thead>

          <tbody>
            {[...activos, ...desactivados].map((producto) => (
              <tr
                key={producto.id_producto}
                className={`border-t ${
                  producto.desactivado ? "text-gray-500 underline" : ""
                }`}
              >
                <td className="text-center border px-4 py-2">
                  {producto.nombre}
                </td>
                <td className="text-center border px-4 py-2">
                  {editandoId === producto.id_producto ? (
                    <input
                      value={editValues.precio}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          precio: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1 text-black"
                    />
                  ) : (
                    `$${producto.precio}`
                  )}
                </td>
                <td className="text-center border px-4 py-2">
                  {editandoId === producto.id_producto ? (
                    <input
                      value={editValues.cantidad}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          cantidad: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1 text-black"
                    />
                  ) : (
                    producto.cantidad_stock
                  )}
                </td>
                <td className="text-center border px-4 py-2">
                  {producto.id_proveedor}
                </td>
                <td className="text-center border px-4 py-2">
                  {editandoId === producto.id_producto ? (
                    <button
                      onClick={() => handleGuardar(producto.id_producto)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditar(producto)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  )}
                </td>
                <td className="text-center border px-4 py-2">
                  {!producto.desactivado ? (
                    <button
                      onClick={() => handleDesactivar(producto.id_producto)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Desactivar
                    </button>
                  ) : (
                    "Desactivado"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
