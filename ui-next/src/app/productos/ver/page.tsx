
import Header from "../../components/Header";

const productos = [
    { id: 1, nombre: "Martillo", precio: 10.99, cantidad: 50, proveedor: "Herramientas Suarez S.A" },
    { id: 2, nombre: "Destornillador", precio: 5.49, cantidad: 30, proveedor: "Herramientas Suarez S.A" },
    { id: 3, nombre: "Sierra", precio: 25.00, cantidad: 15, proveedor: "Herramientas Suarez S.A" },
    { id: 4, nombre: "Cinta métrica", precio: 7.99, cantidad: 100, proveedor: "Herramientas Suarez S.A" },
  ];
  
// pages/productos/registrar.tsx
export default function verProducto() {
    return (

        <>
        <Header />
        
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Añadir filtro de busqueda</h1>

            <form className="space-y-4">
                <div>
                    <label className="block text-withe-700 font-medium">Nombre producto</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option className="text-black" value="">Elige una opción</option>
                        <option className="text-black" value="opcion1">Producto 1</option>
                        <option className="text-black" value="opcion2">Producto 2</option>
                        <option className="text-black" value="opcion3">Producto 3</option>
                    </select>
                </div>
                <div>
                    <label className="block text-withe-700 font-medium">Selecciona el provedoor</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option className="text-black" value="">Elige una opción</option>
                        <option className="text-black" value="opcion1">Proveedor 1</option>
                        <option className="text-black" value="opcion2">Proveedor 2</option>
                        <option className="text-black" value="opcion3">Proveedor 3</option>
                    </select>
                </div>

                <button type="submit"
                className="w-50 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Aplicar
                </button>
            </form>
        </div>
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Registro de Productos</h1>
         
            <table className="min-w-full table-auto border-collapse">
                <thead className="text-white">
                    <tr className="bg-blue-900">
                        <th className="px-4 py-2 border text-center">Nombre</th>
                        <th className="px-4 py-2 border text-center">Precio</th>
                        <th className="px-4 py-2 border text-center">Cantidad en Stock</th>
                        <th className="px-4 py-2 border text-center">Proveedor</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                    <tr key={producto.id} className="border-t">
                        <td className="text-center border px-4 py-2">{producto.nombre}</td>
                        <td className="text-center border px-4 py-2">${producto.precio}</td>
                        <td className="text-center border px-4 py-2">{producto.cantidad}</td>
                        <td className="text-center border px-4 py-2">{producto.proveedor}</td>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>

        </>
        
    );
  }
  