
"use client";
import Header from "../../../components/Header";
import { useEffect, useState } from 'react';

interface ReporteProducto {
    nombre_producto: string;
    total_vendido: number;
}

export default function page(){
    const [productos, setProductos] = useState<ReporteProducto[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:5000/api/reportes/productos")
            if (!res.ok) {
                throw new Error("Error al obtener datos de análisis");
            }
            const data: ReporteProducto[] = await res.json();
            setProductos(data);
        }
        fetchData()
    }, [])    

    return(

        <>
        <Header/>
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Reporte  Productos mas vendidos</h1>

            <table className="min-w-full table-auto border-collapse">
                <thead className="text-white">
                    <tr className="bg-blue-900">
                        <th className="px-4 py-2 border text-center">Nombre producto</th>
                        <th className="px-4 py-2 border text-center">Total vendido</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {productos.map((producto) => (
                        <tr key={producto.nombre_producto} className="text-gray-700">
                        <td className="text-center border px-4 py-2">{producto.nombre_producto}</td>
                        <td className="text-center border px-4 py-2">{producto.total_vendido}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}