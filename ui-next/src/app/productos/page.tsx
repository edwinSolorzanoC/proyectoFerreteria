import Header from "../components/Header";
 
 
 const productos = [
     { id: 1, nombre: "Martillo", precio: 10.99, cantidad: 50, proveedor: "Herramientas Suarez S.A" },
     { id: 2, nombre: "Destornillador", precio: 5.49, cantidad: 30, proveedor: "Herramientas Suarez S.A" },
     { id: 3, nombre: "Sierra", precio: 25.00, cantidad: 15, proveedor: "Herramientas Suarez S.A" },
     { id: 4, nombre: "Cinta métrica", precio: 7.99, cantidad: 100, proveedor: "Herramientas Suarez S.A" },
   ];
   
   export default function Productos() {
     
     return (
     <>
         
         <Header />
         
         <div className="container mx-auto p-6">
             <h1 className="text-3xl font-semibold mb-6">Registro de Productos</h1>
         
             <table className="min-w-full table-auto border-collapse">
                 <thead>
                     <tr className="bg-gray-900">
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