import './App.css';
import SearchComponent from './components/SearchComponent';
import PedidosComponent from "./components/PedidosComponent";
import PedidosClientesComponent from "./components/PedidosClientesComponent";

function App() {
    return (
        <div className="container-fluid">
            <h2 className="text-center">Filtro Clientes</h2>
            <SearchComponent/>

            <h2 className="text-center">Filtro Pedidos</h2>
            <PedidosComponent/>

            <h2 className="text-center">Filtro Pedidos Clientes</h2>
            <PedidosClientesComponent/>
        </div>
    )
        ;
}

export default App;
