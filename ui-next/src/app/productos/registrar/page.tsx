
import Header from "../../components/Header";

// pages/productos/registrar.tsx
export default function RegistrarProducto() {
    return (

        <>
        <Header />
        
        <div  className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Registrar Productos</h1>

        <form className="space-y-4">
            <div>
                <label className="block text-withe-700 font-medium">Nombre</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nombre producto"
                />
            </div>
            <div>
                <label className="block text-withe-700 font-medium">Precio</label>
                <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Precio producto"
                />
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

            <button
            type="submit"
            className="w-50 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Registrar
            </button>
        </form>

     </div>

        </>
        
    );
  }
  