"use client";

import { useState } from "react";
import Header from "../../../components/Header";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  proveedor: string;
  desactivado?: boolean;
};

// Obtener los productos:
/* useEffect(() => {
   fetch("/api/productos") //Ajustar ruta
     .then(res => res.json())
     .then(data => setProductos(data));
 }, []); */

const productosIniciales: Producto[] = [
  { id: 1, nombre: "Martillo", precio: 10.99, cantidad: 50, proveedor: "Herramientas Suarez S.A" },
  { id: 2, nombre: "Destornillador", precio: 5.49, cantidad: 30, proveedor: "Herramientas Suarez S.A" },
  { id: 3, nombre: "Sierra", precio: 25.0, cantidad: 15, proveedor: "Herramientas Suarez S.A" },
  { id: 4, nombre: "Cinta métrica", precio: 7.99, cantidad: 100, proveedor: "Herramientas Suarez S.A" },
];

export default function VerProducto() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ precio: string; cantidad: string }>({ precio: "", cantidad: "" });

  const handleEditar = (producto: Producto) => {
    setEditandoId(producto.id);
    setEditValues({ precio: producto.precio.toString(), cantidad: producto.cantidad.toString() });
  };

  const handleGuardar = async (id: number) => {
    const precioValido = /^[0-9]+(\.[0-9]{1,2})?$/.test(editValues.precio);
    const cantidadValida = /^\d+$/.test(editValues.cantidad);

    if (!precioValido || !cantidadValida) {
      alert("Precio y cantidad deben ser valores numéricos válidos.");
      return;
    }

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, precio: parseFloat(editValues.precio), cantidad: parseInt(editValues.cantidad) }
          : p
      )
    );
    setEditandoId(null);

    // enviar actualización al backend:
    /* await fetch(`/api/productos/${id}`, { //Ajustar rita
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         precio: parseFloat(editValues.precio),
         cantidad: parseInt(editValues.cantidad),
       }),
     }); */
  };

  const handleDesactivar = async (id: number) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, desactivado: true } : p))
    );

    // actualización del estado:
    /* await fetch(`/api/productos/${id}/desactivar`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ desactivado: true }),
     }); */
  };

  const activos = productos.filter((p) => !p.desactivado);
  const desactivados = productos.filter((p) => p.desactivado);

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Añadir filtro de búsqueda</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nombre producto</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option className="text-black" value="">Elige una opción</option>
              <option className="text-black" value="opcion1">Producto 1</option>
              <option className="text-black" value="opcion2">Producto 2</option>
              <option className="text-black" value="opcion3">Producto 3</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Selecciona el proveedor</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option className="text-black" value="">Elige una opción</option>
              <option className="text-black" value="opcion1">Proveedor 1</option>
              <option className="text-black" value="opcion2">Proveedor 2</option>
              <option className="text-black" value="opcion3">Proveedor 3</option>
            </select>
          </div>

          {/* usar botón para filtrar productos desde el backend:
              fetch(`/api/productos?nombre=xxx&proveedor=yyy`) Ajustar ruta*/} 
          <button type="submit" className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Aplicar
          </button>
        </form>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Registro de Productos</h1>

        <table className="min-w-full table-auto border-collapse">
          <thead className="text-white">
            <tr className="bg-blue-900">
              <th className="px-4 py-2 border text-center">Nombre</th>
              <th className="px-4 py-2 border text-center">Precio</th>
              <th className="px-4 py-2 border text-center">Cantidad en Stock</th>
              <th className="px-4 py-2 border text-center">Proveedor</th>
              <th className="px-4 py-2 border text-center">Acciones</th>
              <th className="px-4 py-2 border text-center">Estado</th>
            </tr>
          </thead>

          <tbody>
            {[...activos, ...desactivados].map((producto) => (
              <tr
                key={producto.id}
                className={`border-t ${producto.desactivado ? "text-gray-500 underline" : ""}`}
              >
                <td className="text-center border px-4 py-2">{producto.nombre}</td>

                <td className="text-center border px-4 py-2">
                  {editandoId === producto.id ? (
                    <input
                      type="number"
                      value={editValues.precio}
                      onChange={(e) => setEditValues({ ...editValues, precio: e.target.value })}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  ) : (
                    `$${producto.precio.toFixed(2)}`
                  )}
                </td>

                <td className="text-center border px-4 py-2">
                  {editandoId === producto.id ? (
                    <input
                      type="number"
                      value={editValues.cantidad}
                      onChange={(e) => setEditValues({ ...editValues, cantidad: e.target.value })}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  ) : (
                    producto.cantidad
                  )}
                </td>

                <td className="text-center border px-4 py-2">{producto.proveedor}</td>

                <td className="text-center border px-4 py-2">
                  {editandoId === producto.id ? (
                    <button
                      onClick={() => handleGuardar(producto.id)}
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
                      onClick={() => handleDesactivar(producto.id)}
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
