"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";

export default function RegistrarProducto() {
    // Estados para guardar los valores del formulario
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [cantidadMinima, setCantidadMinima] = useState(""); 
    const [id_proveedor, setProveedor] = useState("");
    // Indica si el formulario está válido
    const [isValid, setIsValid] = useState(false);

    // Validación automática cada vez que cambian los campos del formulario
    useEffect(() => {
        const validarCampos = () => {
            return (
                nombre.trim() !== "" &&
                /^[0-9]+(\.[0-9]{1,2})?$/.test(precio) &&   // Precio debe ser numérico, con máximo dos decimales
                /^\d+$/.test(cantidad) &&                   // Cantidad debe ser un número entero positivo
                /^\d+$/.test(cantidadMinima) &&             // Igual para cantidad mínima
                id_proveedor.trim() !== ""                  // Proveedor debe estar seleccionado
            );
        };

        // Actualiza el estado de validez del formulario
        setIsValid(validarCampos());
    }, [nombre, precio, cantidad, cantidadMinima, id_proveedor]);

    // Ejecuta al enviar el formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita que la página se recargue

        if (!isValid) {
            alert("Por favor, complete correctamente todos los campos.");
            return; // Sale si el formulario no es válido
        }

        // Crea el objeto producto a enviar al servidor
        const nuevoProducto = {
            nombre,
            precio: parseFloat(precio),
            cantidad_stock: parseInt(cantidad),
            stock_minimo: parseInt(cantidadMinima),
            id_proveedor,
        };


            try {
            // Prueba en consola el objeto que se va a enviar, descomentar para comprobaciones
            //console.log("Enviando producto:", nuevoProducto);
            // Realiza la petición POST al backend (API)
            const response = await fetch("http://localhost:5000/api/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto), // Convierte el objeto a JSON
            });

            if (!response.ok) {
                throw new Error("Error al registrar el producto");
            }

            const data = await response.json(); // Obtiene respuesta del servidor
            console.log("Respuesta del servidor:", data);
            alert("Producto registrado exitosamente.");
        } catch (error) {
            console.error("Error al enviar producto:", error);
        }
        

        // Limpia los campos del formulario
         setNombre("");
         setPrecio("");
         setCantidad("");
         setCantidadMinima("");
         setProveedor("");
    };
    // GUI del formulario
    return (
        <>
            <Header />

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Registrar Productos</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre del producto</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nombre producto"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Precio unitario</label>
                        <input
                            type="number"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Precio producto"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Cantidad en almacenes</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Cantidad disponible"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Cantidad mínima por mantener</label>
                        <input
                            type="number"
                            value={cantidadMinima}
                            onChange={(e) => setCantidadMinima(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Cantidad mínima"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Proveedor</label>
                        <select
                            value={id_proveedor}
                            onChange={(e) => setProveedor(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Elige una opción</option>
                            <option value="1">Proveedor 1</option>
                            <option value="2">Proveedor 2</option>
                            <option value="3">Proveedor 3</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-50 text-white py-2 rounded-lg transition ${
                            isValid
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </>
    );
}
