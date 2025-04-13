"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";

// pages/productos/registrar.tsx
export default function RegistrarProducto() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [proveedor, setProveedor] = useState("");

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validarCampos = () => {
            return (
                nombre.trim() !== "" &&
                /^[0-9]+(\.[0-9]{1,2})?$/.test(precio) &&  // valida precio numérico con decimales
                /^\d+$/.test(cantidad) &&                   // valida cantidad como entero positivo
                proveedor.trim() !== ""
            );
        };

        setIsValid(validarCampos());
    }, [nombre, precio, cantidad, proveedor]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValid) {
            alert("Por favor, complete correctamente todos los campos.");
            return;
        }

        const nuevoProducto = {
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad),
            proveedor,
        };

        console.log("Producto registrado:", nuevoProducto);
        alert("Producto registrado con éxito");

//Conexion al back
        /*
        try {
            const response = await fetch("http://localhost:3000/api/productos", { //Ajustar ruta
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error("Error al registrar el producto");
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
        } catch (error) {
            console.error("Error al enviar producto:", error);
        }
        

         Resetear formulario
         setNombre("");
         setPrecio("");
         setCantidad("");
         setProveedor("");*/
    };

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
                        <label className="block text-gray-700 font-medium">Proveedor</label>
                        <select
                            value={proveedor}
                            onChange={(e) => setProveedor(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Elige una opción</option>
                            <option value="Proveedor 1">Proveedor 1</option>
                            <option value="Proveedor 2">Proveedor 2</option>
                            <option value="Proveedor 3">Proveedor 3</option>
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
