"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";

export default function VerFacturasPage() {
    const [facturas, setFacturas] = useState<any[]>([]);
    const [filtro, setFiltro] = useState("");
    const [filtradas, setFiltradas] = useState<any[]>([]);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState<any | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        fetchFacturas(); // Backend: Aquí se obtendrían las facturas desde una API real
    }, []);

    useEffect(() => {
        const term = filtro.toLowerCase();
        const resultado = facturas.filter(f =>
            f.nombre.toLowerCase().includes(term) ||
            f.fecha.includes(term)
        );
        setFiltradas(resultado);
    }, [filtro, facturas]);

    const fetchFacturas = async () => {
        const response = await fetch("http://localhost:5000/api/factura"); // Ajustar rutas
        const data = await response.json();
        const nData = data.map((factura: any) => ({
            ...factura,
            total: factura.total.toFixed(2),
            total_iva: (factura.total + 0.16 * factura.total).toFixed(2),
            fecha: new Date(factura.fecha).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
        }));
        setFacturas(nData);
        setFiltradas(nData);
    };

    const abrirModal = (factura: any) => {
        setFacturaSeleccionada(factura);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setFacturaSeleccionada(null);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Facturas Generadas</h1>

                <input
                    type="text"
                    placeholder="Buscar por cliente o fecha..."
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <table className="w-full border text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">#</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Total con IVA</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtradas.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4">No se encontraron facturas</td>
                            </tr>
                        ) : (
                            filtradas.map((factura) => (
                                <tr key={factura.id_factura} className="border-t">
                                    <td className="p-2">{factura.id_factura}</td>
                                    <td>{factura.nombre}</td>
                                    <td>{factura.fecha}</td>
                                    <td>₡  {factura.total}</td>
                                    <td>₡  {factura.total_iva}</td>
                                    <td>
                                        <button
                                            onClick={() => abrirModal(factura)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Ver detalles
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {mostrarModal && facturaSeleccionada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative shadow-lg">
                        <button
                            onClick={cerrarModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">Detalles de Factura #{facturaSeleccionada.id_factura}</h2>
                        <p><strong>Cliente:</strong> {facturaSeleccionada.nombre}</p>
                        <p><strong>Fecha:</strong> {facturaSeleccionada.fecha}</p>

                        <h3 className="mt-4 font-semibold">Productos</h3>
                        <table className="w-full border text-left mt-2">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facturaSeleccionada.detalles.map((item: any, index: number) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-2">{item.nombre_producto}</td>
                                        <td>{item.cantidad}</td>
                                        <td>₡ {item.precio_unitario.toFixed(2)}</td>
                                        <td>₡ {item.subtotal.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="text-right font-semibold mt-4">
                            <p>Total: ₡ {facturaSeleccionada.total}</p>
                            <p>Total con IVA: ₡ {facturaSeleccionada.total_iva}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
