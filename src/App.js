import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  let greeting = 'BIENVENID@S A DELICUPCAKES'

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/item'>
          <ItemDetailContainer id={'o1i2n3o1'} />
        </Route>
        <Route path='/'>
          <ItemListContainer greeting={greeting} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
