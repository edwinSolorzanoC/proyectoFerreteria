"use client";
import { useState } from "react";
import Header from "../../components/Header";

const initialProveedores = [
    { id: 1, nombre: "Herramientas Suarez S.A", correo: "contacto@suarez.com", telefono: "123456789", direccion: "Av. Libertador 123", tipoHerramienta: "Manual" },
    { id: 2, nombre: "Tools Pro", correo: "soporte@toolspro.com", telefono: "987654321", direccion: "Calle Falsa 456", tipoHerramienta: "Eléctrica" },
    { id: 3, nombre: "Equipos Rápidos", correo: "ventas@equiposrapidos.com", telefono: "123123123", direccion: "Av. Central 789", tipoHerramienta: "Manual" },
];

export default function VerProveedor() {
    const [proveedores, setProveedores] = useState(initialProveedores);
    const [editandoId, setEditandoId] = useState(null);
    const [datosEditados, setDatosEditados] = useState({});

    const handleEditarClick = (proveedor) => {
        setEditandoId(proveedor.id);
        setDatosEditados({ ...proveedor });
    };

    const handleGuardarClick = () => {
        const nuevosProveedores = proveedores.map((p) =>
            p.id === editandoId ? datosEditados : p
        );
        setProveedores(nuevosProveedores);
        setEditandoId(null);
    };

    const handleInputChange = (e) => {
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
                        />
                    </div>

                    <div>
                        <label className="block text-white-700 font-medium">Tipo de herramienta</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option className="text-black" value="">Elige una opción</option>
                            <option className="text-black" value="Manual">Manual</option>
                            <option className="text-black" value="Eléctrica">Eléctrica</option>
                        </select>
                    </div>

                    <button type="submit"
                        className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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
                            <th className="px-4 py-2 border text-center">Correo</th>
                            <th className="px-4 py-2 border text-center">Número telefónico</th>
                            <th className="px-4 py-2 border text-center">Dirección de abastecimiento</th>
                            <th className="px-4 py-2 border text-center">Tipo de herramientas</th>
                            <th className="px-4 py-2 border text-center">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id} className="border-t">
                                {editandoId === proveedor.id ? (
                                    <>
                                        <td className="text-center border px-2 py-2">
                                            <input name="nombre" value={datosEditados.nombre} onChange={handleInputChange} className="w-full border px-2 py-1 rounded" />
                                        </td>
                                        <td className="text-center border px-2 py-2">
                                            <input name="correo" value={datosEditados.correo} onChange={handleInputChange} className="w-full border px-2 py-1 rounded" />
                                        </td>
                                        <td className="text-center border px-2 py-2">
                                            <input name="telefono" value={datosEditados.telefono} onChange={handleInputChange} className="w-full border px-2 py-1 rounded" />
                                        </td>
                                        <td className="text-center border px-2 py-2">
                                            <input name="direccion" value={datosEditados.direccion} onChange={handleInputChange} className="w-full border px-2 py-1 rounded" />
                                        </td>
                                        <td className="text-center border px-2 py-2">
                                            <select name="tipoHerramienta" value={datosEditados.tipoHerramienta} onChange={handleInputChange} className="w-full border px-2 py-1 rounded">
                                                <option value="Manual">Manual</option>
                                                <option value="Eléctrica">Eléctrica</option>
                                            </select>
                                        </td>
                                        <td className="text-center border px-2 py-2">
                                            <button onClick={handleGuardarClick} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Guardar</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="text-center border px-4 py-2">{proveedor.nombre}</td>
                                        <td className="text-center border px-4 py-2">{proveedor.correo}</td>
                                        <td className="text-center border px-4 py-2">{proveedor.telefono}</td>
                                        <td className="text-center border px-4 py-2">{proveedor.direccion}</td>
                                        <td className="text-center border px-4 py-2">{proveedor.tipoHerramienta}</td>
                                        <td className="text-center border px-4 py-2">
                                            <button onClick={() => handleEditarClick(proveedor)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
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


/*import Header from "../../components/Header";

const proveedores = [
    { id: 1, nombre: "Herramientas Suarez S.A", correo: "contacto@suarez.com", telefono: "123456789", direccion: "Av. Libertador 123", tipoHerramienta: "Manual" },
    { id: 2, nombre: "Tools Pro", correo: "soporte@toolspro.com", telefono: "987654321", direccion: "Calle Falsa 456", tipoHerramienta: "Eléctrica" },
    { id: 3, nombre: "Equipos Rápidos", correo: "ventas@equiposrapidos.com", telefono: "123123123", direccion: "Av. Central 789", tipoHerramienta: "Manual" },
];

export default function verProveedor() {
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
                    />
                </div>

                <div>
                    <label className="block text-white-700 font-medium">Tipo de herramienta</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option className="text-black" value="">Elige una opción</option>
                        <option className="text-black" value="Manual">Manual</option>
                        <option className="text-black" value="Eléctrica">Eléctrica</option>
                    </select>
                </div>

                <button type="submit"
                    className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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
                        <th className="px-4 py-2 border text-center">Correo</th>
                        <th className="px-4 py-2 border text-center">Número telefónico</th>
                        <th className="px-4 py-2 border text-center">Dirección de abastecimiento</th>
                        <th className="px-4 py-2 border text-center">Tipo de herramientas</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor) => (
                    <tr key={proveedor.id} className="border-t">
                        <td className="text-center border px-4 py-2">{proveedor.nombre}</td>
                        <td className="text-center border px-4 py-2">{proveedor.correo}</td>
                        <td className="text-center border px-4 py-2">{proveedor.telefono}</td>
                        <td className="text-center border px-4 py-2">{proveedor.direccion}</td>
                        <td className="text-center border px-4 py-2">{proveedor.tipoHerramienta}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
         </div>

        </>
    );
}
*/