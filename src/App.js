import './App.css';
import { NavBar } from './components/NavBar/NavBar'
/* import { ItemListContainer } from './components/ItemListContainer/ItemListContainer' */
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
function App() {

  /* let greeting = 'BIENVENID@S A DELICUPCAKES' */

  return (
    <div className="App">
      <NavBar />
      {/* <ItemListContainer greeting={greeting}/> */}
      <ItemDetailContainer id={'o1i2n3o1'} />
    </div>
  );
}

export default App;
