import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { Footer } from './components/Footer/Footer'
import { Cart } from './components/Cart/Cart'
import {About} from './components/About/About'
import { CartProvider } from './context/CartContext'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  let greeting = 'BIENVENID@S A DELICUPCAKES'
  let about = 'Delicupcakes nació con el objetivo de llevarte la más alta calidad de pastelería'

  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <ItemListContainer greeting={greeting} />
          </Route>
          <Route path='/category/:id'>
            <ItemListContainer greeting={greeting} />
          </Route>
          <Route path='/item/:id'>
            <ItemDetailContainer />
          </Route>
          <Route path='/about'>
            <About greeting={about} />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
        </Switch>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
