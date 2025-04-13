"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

// Valorres temporales de ejemplo.
const initialClientes = [
    { id: 1, nombre: "Carlos Gómez", correo: "carlosg@gmail.com", telefono: "111222333", direccion: "Calle 10 #123" },
    { id: 2, nombre: "Ana Martínez", correo: "ana_martinez@hotmail.com", telefono: "444555666", direccion: "Av. Las Palmas 456" },
    { id: 3, nombre: "Luis Fernández", correo: "luisf@correo.com", telefono: "777888999", direccion: "Carrera 7 #789" },
];

export default function ClientesFrecuentes() {
    const [clientes, setClientes] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroCorreo, setFiltroCorreo] = useState("");

    // Posible opcion de llamada al back para obtener los clientes.
    useEffect(() => {
        /*
        fetch("/api/clientes") //
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener clientes");
                }
                return res.json();
            })
            .then((data) => setClientes(data))
            .catch((error) => {
                console.error("Error al conectar con el backend:", error);
                alert("Hubo un error al cargar los clientes.");
            });
        */

        // seteo de datos de clientes ficticios
        setClientes(initialClientes);
    }, []);

    const clientesFiltrados = clientes.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
        cliente.correo.toLowerCase().includes(filtroCorreo.toLowerCase())
    );

    return (
        <>
            <Header />

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Buscar Clientes Frecuentes</h1>

                {/* Filtros de búsqueda */}
                <form className="space-y-4 mb-8">
                    <div>
                        <label className="block text-white-700 font-medium">Nombre del Cliente</label>
                        <input
                            type="text"
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Filtrar por nombre"
                        />
                    </div>

                    <div>
                        <label className="block text-white-700 font-medium">Correo</label>
                        <input
                            type="text"
                            value={filtroCorreo}
                            onChange={(e) => setFiltroCorreo(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Filtrar por correo"
                        />
                    </div>
                </form>

                {/* Tabla de resultados */}
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
                                <tr key={cliente.id} className="border-t">
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
