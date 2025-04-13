"use client";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";

// Actualización de la interfaz para que coincida con los datos de la API
interface Proveedores {
  id_proveedor: number;
  nombre: string;
  contacto: string;
  telefono: string;
  direccion: string;
}

export default function VerProveedor() {
  const [proveedores, setProveedores] = useState<Proveedores[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  // Cargar los proveedores desde la API
  useEffect(() => {
    fetch("http://localhost:5000/api/proveedores")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener proveedores");
        return res.json();
      })
      .then((data) => setProveedores(Array.isArray(data) ? data : [data]))
      .catch((error) => {
        console.error("Error al conectar con el backend:", error);
        alert("Hubo un error al cargar los proveedores.");
      });
  }, []);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Proveedores | {}>({});

  const handleEditarClick = (proveedor: Proveedores) => {
    setEditandoId(proveedor.id_proveedor);
    setDatosEditados({ ...proveedor });
  };

  const handleGuardarClick = () => {
    const nuevosProveedores = proveedores.map((p) =>
      p.id_proveedor === editandoId ? (datosEditados as Proveedores) : p
    );
    setProveedores(nuevosProveedores);
    setEditandoId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
  };

  return (
    <>
      <Header />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Añadir filtro de búsqueda</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-white-700 font-medium">Nombre del proveedor</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa el nombre del proveedor"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Aplicar
          </button>
        </form>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Registro de Proveedores</h1>

        <table className="min-w-full table-auto border-collapse">
          <thead className="text-white">
            <tr className="bg-blue-900">
              <th className="px-4 py-2 border text-center">Proveedor</th>
              <th className="px-4 py-2 border text-center">Contacto</th>
              <th className="px-4 py-2 border text-center">Número telefónico</th>
              <th className="px-4 py-2 border text-center">Dirección de abastecimiento</th>
              <th className="px-4 py-2 border text-center">Editar</th>
            </tr>
          </thead>
          <tbody>
            {proveedores
              .filter((proveedor) =>
                proveedor.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
              )
              .map((proveedor) => (
                <tr key={proveedor.id_proveedor} className="border-t">
                  {editandoId === proveedor.id_proveedor ? (
                    <>
                      <td className="text-center border px-2 py-2">
                        <input
                          name="nombre"
                          value={(datosEditados as Proveedores).nombre}
                          onChange={handleInputChange}
                          className="w-full border px-2 py-1 rounded"
                        />
                      </td>
                      <td className="text-center border px-2 py-2">
                        <input
                          name="contacto"
                          value={(datosEditados as Proveedores).contacto}
                          onChange={handleInputChange}
                          className="w-full border px-2 py-1 rounded"
                        />
                      </td>
                      <td className="text-center border px-2 py-2">
                        <input
                          name="telefono"
                          value={(datosEditados as Proveedores).telefono}
                          onChange={handleInputChange}
                          className="w-full border px-2 py-1 rounded"
                        />
                      </td>
                      <td className="text-center border px-2 py-2">
                        <input
                          name="direccion"
                          value={(datosEditados as Proveedores).direccion}
                          onChange={handleInputChange}
                          className="w-full border px-2 py-1 rounded"
                        />
                      </td>
                      <td className="text-center border px-2 py-2">
                        <button
                          onClick={handleGuardarClick}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Guardar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="text-center border px-4 py-2">{proveedor.nombre}</td>
                      <td className="text-center border px-4 py-2">{proveedor.contacto}</td>
                      <td className="text-center border px-4 py-2">{proveedor.telefono}</td>
                      <td className="text-center border px-4 py-2">{proveedor.direccion}</td>
                      <td className="text-center border px-4 py-2">
                        <button
                          onClick={() => handleEditarClick(proveedor)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
