import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
function App() {

  let greeting = 'Bienvenid@ a DeliCupcakes'

  return (
    <div className="App">
      <NavBar />
      <ItemListContainer greeting={greeting}/>
    </div>
  );
}

export default App;
