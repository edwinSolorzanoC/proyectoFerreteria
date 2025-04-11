"use client";

import { useState } from "react";
import Header from "../../components/Header";

type Venta = {
  id: number;
  fecha: string;
  cantidadProductos: number;
  total: number;
};


export default function page(){

    const ventasDiarias: Venta[] = [
        { id: 1, fecha: "11/03/2025", cantidadProductos: 150, total: 230000 },
        { id: 1, fecha: "11/03/2025", cantidadProductos: 98, total: 189000 },
    ];

    const ventasSemanales: Venta[] = [
        { id: 1, fecha: "09/02/2025", cantidadProductos: 4000, total: 1120000 },
        { id: 1, fecha: "09/02/2025", cantidadProductos: 3800, total: 988000 },
    ];

    const ventasMensuales: Venta[] = [
        { id: 1, fecha: "20/02/2025", cantidadProductos: 9000, total: 1400000 },
        { id: 1, fecha: "20/02/2025", cantidadProductos: 7800, total: 1200300 },
    ];

    
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const fechaHoyDia = new Date();
    const anioHoyDia = fechaHoyDia.getFullYear();
    const mesHoyDia = String(fechaHoyDia.getMonth() + 1).padStart(2, "0"); // Mes es 0-indexado (0 = enero, 11 = diciembre)
    const diaHoyDia = String(fechaHoyDia.getDate()).padStart(2, "0"); // Asegura dos dígitos en el día
    const maxFechaDia = `${anioHoyDia}-${mesHoyDia}-${diaHoyDia}`; // Formato YYYY-MM-DD


    const [semanaSeleccionada, setSemanaSeleccionada] = useState("");
    const fechaHoySemana = new Date();
    const anioHoySemana = fechaHoySemana.getFullYear();
    const semanaHoySemana = Math.ceil(
    (fechaHoySemana.getDate() - fechaHoySemana.getDay() + 1) / 7
    ); // Obtener la semana del año, asumiendo que la semana empieza en lunes

    const semanaHoyFormateada = `${anioHoySemana}-W${String(semanaHoySemana).padStart(2, "0")}`; // Formato YYYY-Www
    const maxSemana = semanaHoyFormateada;

    const [mesSeleccionado, setMesSeleccionado] = useState("");
    const fechaHoyMes = new Date();
    const anioHoyMes = fechaHoyMes.getFullYear();
    const mesHoyMes = String(fechaHoyMes.getMonth() + 1).padStart(2, "0"); // Mes es 0-indexado (0 = enero, 11 = diciembre)
    const maxFechaMes = `${anioHoyMes}-${mesHoyMes}`; // Formato YYYY-MM


    return(
        <>
        
        <Header />
        

        <div className="container mx-auto p-6">

        

            <h1 className="text-3xl font-semibold mb-6">Reporte Ventas diarias</h1>
            
            <form className="space-y-4 mb-6">
                <div>
                    <label className="block">Seleccione el dia</label>
                    <input
                    type="date"
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    max={maxFechaDia} // No permite seleccionar una fecha posterior a hoy
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button type="submit" className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Aplicar
                </button>
            </form>

            <table className="min-w-full table-auto border-collapse">
                <thead className="text-white">
                    <tr className="bg-blue-900">
                        <th className="px-4 py-2 border text-center">Fecha</th>
                        <th className="px-4 py-2 border text-center">Cantidad Productos</th>
                        <th className="px-4 py-2 border text-center">Precio Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {ventasDiarias.map((venta) => (
                        <tr key={venta.id} className="text-gray-700">
                        <td className="text-center border px-4 py-2">{venta.fecha}</td>
                        <td className="text-center border px-4 py-2">{venta.cantidadProductos}</td>
                        <td className="text-center border px-4 py-2">${venta.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Reporte Ventas Semanales</h1>
            <form className="space-y-4 mb-6">
                <div>
                    <label className="block">Seleccione la semana</label>
                    <input
                    type="week"
                    value={semanaSeleccionada}
                    onChange={(e) => setSemanaSeleccionada(e.target.value)}
                    max={maxSemana} // No permite seleccionar una semana posterior a la semana actual
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                   
                </div>

                <button type="submit" className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Aplicar
                </button>
                
            </form>

            <table className="min-w-full table-auto border-collapse">
                <thead className="text-white">
                    <tr className="bg-blue-900">
                        <th className="px-4 py-2 border text-center">Fecha</th>
                        <th className="px-4 py-2 border text-center">Cantidad Productos</th>
                        <th className="px-4 py-2 border text-center">Precio Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {ventasSemanales.map((venta) => (
                        <tr key={venta.id} className="text-gray-700">
                        <td className="text-center border px-4 py-2">{venta.fecha}</td>
                        <td className="text-center border px-4 py-2">{venta.cantidadProductos}</td>
                        <td className="text-center border px-4 py-2">${venta.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Reporte Ventas Mensuales</h1>
            
            <form className="space-y-4 mb-6">
                <div>
                    <label className="block">Seleccione el Mes</label>
                   
    
                    <input
                        type="month"
                        
                        value={mesSeleccionado}
                        onChange={(e) => setMesSeleccionado(e.target.value)}
                        max={maxFechaMes} // No permite seleccionar un mes posterior al actual
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                
                </div>

                <button type="submit" className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Aplicar
                </button>
            </form>


            <table className="min-w-full table-auto border-collapse">
                <thead className="text-white">
                    <tr className="bg-blue-900">
                        <th className="px-4 py-2 border text-center">Fecha</th>
                        <th className="px-4 py-2 border text-center">Cantidad Productos</th>
                        <th className="px-4 py-2 border text-center">Precio Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {ventasMensuales.map((venta) => (
                        <tr key={venta.id} className="text-gray-700">
                        <td className="text-center border px-4 py-2">{venta.fecha}</td>
                        <td className="text-center border px-4 py-2">{venta.cantidadProductos}</td>
                        <td className="text-center border px-4 py-2">${venta.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>


        </>
    )

}