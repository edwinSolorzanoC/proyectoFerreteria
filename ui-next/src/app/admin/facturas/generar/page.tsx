"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";

export default function Page() {
    const clienteRef = useRef<HTMLSelectElement>(null);
    const fechaRef = useRef<HTMLInputElement>(null);
    const [productos, setProductos] = useState<any[]>([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState<any[]>([]);
    const productoRef = useRef<HTMLSelectElement>(null);
    const cantidadRef = useRef<HTMLInputElement>(null);
    const [clientes, setClientes] = useState<any[]>([]);

    useEffect(() => {
        fetchClientes();
        fetchProductos();
    }, []);

    // jalar los clientes desde el backend
    const fetchClientes = async () => {
    //para reemplazar datos mock:
        /*
        try {
            const res = await fetch("/api/clientes"); // ajustar ruta
            if (!res.ok) throw new Error("Error al obtener clientes");
            const data = await res.json();
            setClientes(data);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
            alert("No se pudieron cargar los clientes");
        }
        */

        // de momento para mostrar datos mockup:
        setClientes([
            { id_cliente: 1, nombre: "Carlos Pérez" },
            { id_cliente: 2, nombre: "Ana Gómez" }
        ]);
    };

    //obtener los productos desde el back
    const fetchProductos = async () => {
        // ara reemplazar datos mock:
        /*
        try {
            const res = await fetch("/api/productos"); //Ajustar ruta
            if (!res.ok) throw new Error("Error al obtener productos");
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            alert("No se pudieron cargar los productos");
        }
        */

        // misma vara de momento para mostrar datos mockup:
        setProductos([
            { id_producto: 1, nombre: "Martillo", precio: 12.5 },
            { id_producto: 2, nombre: "Taladro", precio: 45.0 }
        ]);
    };

    const agregarProducto = () => {
        const idProd = parseInt(productoRef.current?.value || "0");
        const cantidad = parseInt(cantidadRef.current?.value || "0");
        const producto = productos.find(p => p.id_producto === idProd);

        if (!producto || cantidad <= 0) {
            alert("Selecciona un producto y una cantidad válida.");
            return;
        }

        const yaAgregado = productosSeleccionados.find(p => p.id_producto === idProd);
        if (yaAgregado) {
            alert("Este producto ya fue agregado.");
            return;
        }

        const subtotal = cantidad * producto.precio;

        setProductosSeleccionados(prev => [
            ...prev,
            {
                ...producto,
                cantidad,
                subtotal
            }
        ]);

        productoRef.current!.value = "";
        cantidadRef.current!.value = "";
    };

    const calcularTotal = () => {
        return productosSeleccionados.reduce((acc, p) => acc + p.subtotal, 0).toFixed(2);
    };

    const calcularTotalConImpuesto = () => {
        const total = parseFloat(calcularTotal());
        const totalConIVA = total * 1.13;
        return totalConIVA.toFixed(2);
    };

    const generarFactura = (e: React.FormEvent) => {
        e.preventDefault();

        const id_cliente = clienteRef.current?.value;
        const fecha = fechaRef.current?.value;

        if (!id_cliente || !fecha || productosSeleccionados.length === 0) {
            alert("Completa todos los campos y selecciona al menos un producto.");
            return;
        }

        const factura = {
            id_cliente: parseInt(id_cliente),
            fecha,
            total: calcularTotal(),
            total_con_impuesto: calcularTotalConImpuesto(),
            detalles: productosSeleccionados.map(p => ({
                id_producto: p.id_producto,
                cantidad: p.cantidad,
                precio_unitario: p.precio,
                subtotal: p.subtotal
            }))
        };

        console.log("Factura generada:", factura);

        // para un POST al back para registrar la factura:
        /*
        try {
            const res = await fetch("/api/facturas", { //Ajustar ruta
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(factura),
            });
            if (!res.ok) throw new Error("Error al registrar factura");
            alert("Factura registrada exitosamente");
        } catch (error) {
            console.error("Error al enviar la factura:", error);
            alert("No se pudo registrar la factura.");
        }
        */

        alert("Factura registrada exitosamente");
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Generar Factura</h1>
                <form className="space-y-4" onSubmit={generarFactura}>
                    <div>
                        <label className="block font-medium">Cliente</label>
                        <select
                            ref={clienteRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Selecciona un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                    {cliente.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Fecha</label>
                        <input
                            type="date"
                            ref={fechaRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">Producto</label>
                            <select
                                ref={productoRef}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="">Selecciona un producto</option>
                                {productos.map(prod => (
                                    <option key={prod.id_producto} value={prod.id_producto}>
                                        {prod.nombre} - ${prod.precio}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">Cantidad</label>
                            <input
                                type="number"
                                min="1"
                                ref={cantidadRef}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Cantidad"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={agregarProducto}
                        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Agregar producto
                    </button>

                    {productosSeleccionados.length > 0 && (
                        <>
                            <h2 className="text-xl font-semibold mt-6">Productos Seleccionados</h2>
                            <table className="w-full border mt-4 text-left">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-2">Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosSeleccionados.map((p, index) => (
                                        <tr key={index}>
                                            <td className="p-2">{p.nombre}</td>
                                            <td>{p.cantidad}</td>
                                            <td>${p.precio.toFixed(2)}</td>
                                            <td>${p.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-right font-bold mt-2 space-y-1">
                                <div>Total: ${calcularTotal()}</div>
                                <div>Total con 13% IVA: ${calcularTotalConImpuesto()}</div>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-50 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-4"
                    >
                        Registrar Factura
                    </button>
                </form>
            </div>
        </>
    );
}
