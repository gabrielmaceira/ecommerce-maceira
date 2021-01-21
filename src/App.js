import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  let greeting = 'BIENVENID@S A DELICUPCAKES'

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <ItemListContainer greeting={greeting} />
        </Route>
        <Route path='/category/:id'>
          <ItemListContainer greeting={greeting} />
        </Route>
        <Route path='/item/:id'>
          <ItemDetailContainer id={'o1i2n3o1'} />
        </Route>
        <Route path='/about'>
          <ItemListContainer greeting={greeting} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
