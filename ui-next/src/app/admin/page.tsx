export interface Cliente{
    id_cliente: number;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    fecha_registro: string;
}

const getClientes: () => Promise<Cliente[]> = async () => {
    try{
        const res = await fetch('http://localhost:5000/api/clientes');
        if (res.status === 200){
            return res.json();
        }
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

export default async function Admin() {
    const clientes = await getClientes();
    return (
        <div>
            <h1>Lista clientes</h1>
            <ul>
                {
                    clientes.map((cliente) => (
                        <li key={cliente.id_cliente}>
                            {cliente.nombre} - {cliente.correo} - {cliente.telefono} - {cliente.direccion} - {cliente.fecha_registro}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
