import React, {useState, useEffect} from 'react'

const PedidosClientesComponent = () => {
    //setear los hooks useState
    const [pedidos_cliente, setPedidosCliente] = useState([])
    const [search, setSearch] = useState("")

    //función para traer los datos de la API
    const URL = 'http://localhost:5000/pedido_cliente'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        //console.log(data)
        setPedidosCliente(data)
    }
    //función de búsqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    //metodo de filtrado 1
    /*  let results = []
    if(!search)
    {
        results = users
    }else{
         results = users.filter( (dato) =>
         dato.name.toLowerCase().includes(search.toLocaleLowerCase())
     )
    } */

    //metodo de filtrado 2
    const results = !search ? pedidos_cliente : pedidos_cliente.filter((dato) => dato.numero_pedido.toString().includes(search.toLocaleString()))

    useEffect(() => {
        showData()
    }, [])

    //renderizamos la vista
    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder='Buscar por N° de pedido'
                   className='form-control'/>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                <tr className='bg-curso text-white'>
                    <th>NAME</th>
                    <th>USER NAME</th>
                    <th>CEDULA</th>
                    <th>TIPO PEDIDO</th>
                    <th>N° PEDIDO</th>
                </tr>
                </thead>
                <tbody>
                {results.map((pedido_cliente) => (
                    <tr key={pedido_cliente.id}>
                        <td>{pedido_cliente.NOMBRE}</td>
                        <td>{pedido_cliente.APELLIDO}</td>
                        <td>{pedido_cliente.CEDULA}</td>
                        <td>{pedido_cliente.tipo_pedido}</td>
                        <td>{pedido_cliente.numero_pedido}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default PedidosClientesComponent