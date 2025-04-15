"use client";

import Header from "../../../components/Header";
import React, { useEffect, useState } from "react";

interface OrdenesApi {
  id_orden: number,
  fecha: string,
  cantidad: number,
  estado: boolean,
  proveedores_id_proveedor: number,
  productos_id_producto: number,
  nombre_producto: string,
  nombre_proveedor: string
}



export default function VerOrdenes() {

  const [ordenes, setProductos] = useState<OrdenesApi[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/ordenes")
      .then((response) => response.json())
      .then((data) => {
        const datos = Array.isArray(data) ? data : [data];

        const ordenesConEstado = datos.map((p) => ({
          ...p,
          desactivado: false,
        }));
        setProductos(ordenesConEstado);
      })
      .catch((error) => {
        console.error("Error al conectar con la API:", error);
      });
  }, []);

  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ordenes/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setProductos((prev) => prev.filter((orden) => orden.id_orden !== id));
      } else {
        console.error("Error al eliminar la orden");
      }
    } catch (error) {
      console.error("Error de red al eliminar la orden:", error);
    }
  };
  

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-2">Registro de ordenenes de compra automaticas</h1>
        <p className="text mb-6">Registro de ordenes de compra que se realizan automaticamente cuando el inventario
          de un producto esta bajo
        </p>

        <table className="min-w-full table-auto border-collapse">
          <thead className="text-white">
            <tr className="bg-blue-900">
              <th className="px-4 py-2 border text-center">Fecha Orden</th>
              <th className="px-4 py-2 border text-center">Cantidad</th>
              <th className="px-4 py-2 border text-center">Estado</th>
              <th className="px-4 py-2 border text-center">Proveedor</th>
              <th className="px-4 py-2 border text-center">Producto</th>
              <th className="px-4 py-2 border text-center">Opciones</th>

            </tr>
          </thead>

          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center border px-4 py-4 text-gray-500">No hay datos aún</td>
              </tr>
              ) : (
                ordenes.map((orden) => (
                <tr key={orden.id_orden} className="text-gray-700">
                  <td className="text-center border px-4 py-2">
                    {new Date(orden.fecha).toLocaleDateString("es-ES")}
                  </td>
                  <td className="text-center border px-4 py-2">{orden.cantidad}</td>
                  <td className="text-center border px-4 py-2">
                    {orden.estado ? "Activo" : "Inactivo"}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {orden.nombre_proveedor}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {orden.nombre_producto}
                  </td>
                  <td className="text-center border px-4 py-2">
                  <button  onClick={() => handleEliminar(orden.id_orden)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Cancelar</button>
                  </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
