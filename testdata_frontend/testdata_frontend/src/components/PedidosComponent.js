import React, {useState, useEffect} from 'react'

const SearchComponent = () => {
    //setear los hooks useState
    const [pedidos, setPedidos] = useState([])
    const [search, setSearch] = useState("")

    //función para traer los datos de la API
    const URL = 'http://localhost:5000/pedidos'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        // console.log(data)
        setPedidos(data)
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
    const results = !search ? pedidos : pedidos.filter((dato) => dato.tipo_pedido.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        showData()
    }, [])

    //renderizamos la vista
    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder='Buscar por tipo de pedido'
                   className='form-control'/>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                <tr className='bg-curso text-white'>
                    <th>TIPO PEDIDO</th>
                    <th>NUMERO PEDIDO</th>
                    <th>CC CLIENTE</th>

                </tr>
                </thead>
                <tbody>
                {results.map((pedido) => (
                    <tr key={pedido.id}>
                        <td>{pedido.tipo_pedido}</td>
                        <td>{pedido.numero_pedido}</td>
                        <td>{pedido.cc_cliente}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default SearchComponent