"use client";

import { useRef } from "react";
import Header from "../../../components/Header";

export default function RegistrarProducto() {
    //Referencias para acceder directamente a los valores de los campos del formulario
    const nombreRef = useRef<HTMLInputElement>(null);
    const contactoRef = useRef<HTMLInputElement>(null);
    const telefonoRef = useRef<HTMLInputElement>(null);
    const direccionRef = useRef<HTMLInputElement>(null);

    // Esta función se ejecuta cuando se escribe en el input de teléfono
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "telefono") {
            // Elimina todo lo que no sea número
            const soloNumeros = value.replace(/\D/g, '');
            // Limita el número a 8 dígitos
            const numerosLimitados = soloNumeros.slice(0, 8);
            // Agrega un guion después de los primeros 4 dígitos si es necesario
            let formateado = numerosLimitados;
            if (numerosLimitados.length > 4) {
                formateado = `${numerosLimitados.slice(0, 4)}-${numerosLimitados.slice(4)}`;
            }
            // Asigna el valor formateado al input de teléfono
            telefonoRef.current!.value = formateado;
        }
    };

    //Se ejecuta cuando el formulario se envía
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita que la página se recargue
        // Obtiene los valores actuales de los inputs
        const nombre = nombreRef.current?.value.trim();
        const contacto = contactoRef.current?.value.trim();
        const telefono = telefonoRef.current?.value.trim();
        const direccion = direccionRef.current?.value.trim();
        // Verifica que todos los campos estén llenos
        if (!nombre || !contacto || !telefono || !direccion) {
            alert("Por favor, complete todos los campos antes de registrar.");
            return;
        }
        // Verifica que el teléfono tenga el formato correcto XXXX-XXXX
        const telefonoValido = /^\d{4}-\d{4}$/.test(telefono);
        if (!telefonoValido) {
            alert("Por favor, ingrese un número telefónico válido en formato XXXX-XXXX.");
            return;
        }
        // Crea el objeto con los datos a enviar
        const datos = {
            nombre,
            contacto,
            telefono,
            direccion
        };
        // Intenta enviar los datos al backend
        try {
            // Muestra los datos en consola (Dev Tools) descomentar para probar
            //console.log("Enviando producto:", datos);
            const respuesta = await fetch("http://localhost:5000/api/proveedores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos) // Convierte el objeto a JSON
            });
            // Verifica la respuesta del servidor
            if (respuesta.ok) {
                alert("Registro exitoso");
                console.log("Datos enviados:", datos);
            } else {
                alert("Error al registrar. Inténtelo nuevamente.");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };
    // GUI del formulario
    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Registro de proveedores</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            ref={nombreRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nombre del proveedor"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Contacto (correo)</label>
                        <input
                            type="email"
                            name="contacto"
                            ref={contactoRef}
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
                            maxLength={9}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="XXXX-XXXX"
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
