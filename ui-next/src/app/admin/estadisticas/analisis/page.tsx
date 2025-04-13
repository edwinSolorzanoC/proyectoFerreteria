
"use client";

import Header from "../../../components/Header";
import { useEffect, useState } from 'react';

interface ReporteProducto {
    nombre_producto: string;
    total_vendido: number;
}

export default function page(){
    const [data, setData] = useState<ReporteProducto[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:5000/api/reportes/productos")
            if (!res.ok) {
                throw new Error("Error al obtener datos de análisis");
            }
            const data: ReporteProducto[] = await res.json();
            setData(data);
        }
        fetchData()
    }, [])    

    return(

        <>
        <Header/>
        {
            data.map((producto) => (
                <div key={producto.nombre_producto} className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h2 className="text-xl font-bold text-white">{producto.nombre_producto}</h2>
                    <p className="text-gray-400">Total vendido: {producto.total_vendido}</p>
                </div>
            ))
        }
        </>

    )
}