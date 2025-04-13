"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function RegistrarCliente() {
    // Estado para almacenar los valores del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: ""
    });

    // Estado para verificar si cada campo es válido
    const [isValid, setIsValid] = useState({
        nombre: false,
        correo: false,
        telefono: false,
        direccion: false
    });

    // Validación básica de formato de correo electrónico
    const validarCorreo = (correo: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    };

    // Validación para que el número tenga exactamente 8 dígitos
    const validarTelefono = (telefono: string) => {
        return /^\d{8}$/.test(telefono);
    };

    // Maneja el cambio de los inputs del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let nuevoValor = value;
        // Si el campo es teléfono, solo permite dígitos (hasta 8 caracteres)
        if (name === "telefono") {
            nuevoValor = value.replace(/[^\d]/g, "");// Elimina todo lo que no sea número
            if (nuevoValor.length > 8) nuevoValor = nuevoValor.slice(0, 8);// Limita a 8 dígitos
        }
        // Actualiza el valor del campo correspondiente
        const updatedForm = { ...formData, [name]: nuevoValor };
        setFormData(updatedForm);
        // Verifica si el campo actualizado es válido
        let isCampoValido = false;
        switch (name) {
            case "correo":
                isCampoValido = validarCorreo(nuevoValor);
                break;
            case "telefono":
                isCampoValido = validarTelefono(nuevoValor);
                break;
            default:
                isCampoValido = nuevoValor.trim().length > 0; // Verifica que no esté vacío
        }
        // Actualiza la validez del campo
        setIsValid({ ...isValid, [name]: isCampoValido });
    };

    // Manejo el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita que se recargue la página

        try {
            const response = await fetch("http://localhost:5000/api/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al registrar el cliente.");
            }

            alert("Cliente registrado correctamente.");

            // Reinicia el formulario después de enviar correctamente
            setFormData({
                nombre: "",
                correo: "",
                telefono: "",
                direccion: ""
            });
            setIsValid({
                nombre: false,
                correo: false,
                telefono: false,
                direccion: false
            });
        } catch (error: any) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error al registrar el cliente.");
        }
    };

    // Verifica si todos los campos del formulario son válidos
    const allValid = Object.values(isValid).every(Boolean);

    // Formatea el número de teléfono para mostrarlo con guion (XXXX-XXXX)
    const formatearTelefonoParaVista = (telefono: string) => {
        return telefono.length === 8
            ? `${telefono.slice(0, 4)}-${telefono.slice(4)}`
            : telefono;
    };
    
    // GUI del formulario
    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Registro de clientes</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre del cliente</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                isValid.nombre ? "border-green-500" : "border-red-400"
                            }`}
                            placeholder="Nombre completo"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                isValid.correo ? "border-green-500" : "border-red-400"
                            }`}
                            placeholder="E-mail"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Número telefónico</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formatearTelefonoParaVista(formData.telefono)}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                isValid.telefono ? "border-green-500" : "border-red-400"
                            }`}
                            placeholder="XXXX-XXXX"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                isValid.direccion ? "border-green-500" : "border-red-400"
                            }`}
                            placeholder="Dirección del cliente"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!allValid}
                        className={`w-50 py-2 rounded-lg transition ${
                            allValid
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                    >
                        Registrar cliente
                    </button>
                </form>
            </div>
        </>
    );
}
