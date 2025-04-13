"use client";

import { useRef } from "react";
import Header from "../../../components/Header";

export default function RegistrarProducto() {
    const proveedorRef = useRef<HTMLInputElement>(null);
    const correoRef = useRef<HTMLInputElement>(null);
    const telefonoRef = useRef<HTMLInputElement>(null);
    const direccionRef = useRef<HTMLInputElement>(null);
    const herramientasRef = useRef<HTMLSelectElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "telefono") {
            // Validar formato XXXX-XXXX
            const regex = /^\(\+506\) \d{4}-\d{4}$/;
            if (value.length <= 14 && (/^\(\+506\) \d{0,4}-?\\d{0,4}$/.test(value) || value === "(+506) ")) {
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // valida si los campos estan completos
        const proveedor = proveedorRef.current?.value.trim();
        const correo = correoRef.current?.value.trim();
        const telefono = telefonoRef.current?.value.trim();
        const direccion = direccionRef.current?.value.trim();
        const herramientas = herramientasRef.current?.value.trim();

        if (!proveedor || !correo || !telefono || !direccion || !herramientas) {
            alert("Por favor, complete todos los campos antes de registrar.");
            return;
        }

        // Formatear el número antes de enviarlo a la base de datos
        const telefonoFormateado = telefono.replace("(+506) ", "506 ").replace("-", " ");

        console.log("Datos enviados:", {
            proveedor,
            correo,
            telefono: telefonoFormateado,
            direccion,
            herramientas
        });

        alert("Registro exitoso");
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Registro de proveedores</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Proveedor</label>
                        <input
                            type="text"
                            name="proveedor"
                            ref={proveedorRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nombre del proveedor"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            ref={correoRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="E-mail"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Número telefónico</label>
                        <input
                            type="text"
                            name="telefono"
                            ref={telefonoRef}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="(+506) XXXX-XXXX"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Dirección de abastecimiento</label>
                        <input
                            type="text"
                            name="direccion"
                            ref={direccionRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ubicación"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Tipo de herramientas</label>
                        <select
                            name="herramientas"
                            ref={herramientasRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Elige una opción</option>
                            <option value="Electricas">Eléctricas</option>
                            <option value="Manuales">Manuales</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-50 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </>
    );
}