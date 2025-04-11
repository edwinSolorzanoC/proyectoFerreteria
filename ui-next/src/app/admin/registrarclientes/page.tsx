"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function RegistrarCliente() {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: ""
    });

    const [isValid, setIsValid] = useState({
        nombre: false,
        correo: false,
        telefono: false,
        direccion: false
    });

    const validarCorreo = (correo: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    };

    const validarTelefono = (telefono: string) => {
        const regex = /^\(\+506\) \d{4}-\d{4}$/;
        return regex.test(telefono);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let nuevoValor = value;

        if (name === "telefono") {
            // Formatear mientras escribe
            nuevoValor = value.replace(/[^\d]/g, "");
            if (nuevoValor.length > 8) nuevoValor = nuevoValor.slice(0, 8);
            if (nuevoValor.length > 4) {
                nuevoValor = `(+506) ${nuevoValor.slice(0, 4)}-${nuevoValor.slice(4)}`;
            } else if (nuevoValor.length > 0) {
                nuevoValor = `(+506) ${nuevoValor}`;
            }
        }

        const updatedForm = { ...formData, [name]: nuevoValor };
        setFormData(updatedForm);

        // Validar campos individualmente
        let isCampoValido = false;
        switch (name) {
            case "correo":
                isCampoValido = validarCorreo(nuevoValor);
                break;
            case "telefono":
                isCampoValido = validarTelefono(nuevoValor);
                break;
            default:
                isCampoValido = nuevoValor.trim().length > 0;
        }

        setIsValid({ ...isValid, [name]: isCampoValido });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const telefonoFormateado = formData.telefono.replace("(+506) ", "506 ").replace("-", " ");

        console.log("Cliente registrado:", {
            ...formData,
            telefono: telefonoFormateado
        });

        alert("Cliente registrado exitosamente");
    };

    const allValid = Object.values(isValid).every(Boolean);

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
                            value={formData.telefono}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                isValid.telefono ? "border-green-500" : "border-red-400"
                            }`}
                            placeholder="(+506) XXXX-XXXX"
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
