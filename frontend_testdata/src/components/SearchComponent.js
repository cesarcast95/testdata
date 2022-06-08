import React, {useState, useEffect} from 'react';

const SearchComponent = () => {
    //Setear los hooks useStates
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    //Funcion para obtener los datos de la API
    const URL = 'http://localhost:5000/clientes'
    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        // console.log(data)
        setUsers(data)
    }


    //Funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        // console.log(e.target.value)
    }


    const results = !search ? users : users.filter((dato) => dato.NOMBRE.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        showData()
    }, [])
    //Renderizacion de la vista
    return (
        <div>
            <input value={search} onChange={searcher} type='text' placeholder='Buscar por nombre'
                   className='form-control'/>
            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                <tr className='bg-curso text-white'>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cédula</th>
                    <th>Nacimiento</th>

                </tr>
                </thead>
                <tbody>
                {results.map((user) => (
                    <tr key={user.CEDULA}>
                        <td>{user.NOMBRE}</td>
                        <td>{user.APELLIDO}</td>
                        <td>{user.CEDULA}</td>
                        <td>{user.NACIMIENTO}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default SearchComponent