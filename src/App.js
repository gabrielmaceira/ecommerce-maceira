import './App.css';
import { NavBarContainer } from './components/NavBar/NavBarContainer/NavBarContainer'
import { ItemListContainer } from './components/ItemList/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetail/ItemDetailContainer/ItemDetailContainer'
import { Footer } from './components/Footer/Footer'
import { CartContainer } from './components/Cart/CartContainer/CartContainer'
import { About } from './components/About/About'
import { OrderListContainer } from './components/Orders/OrderListContainer/OrderListContainer'
import { NoMatch } from './components/NoMatch/NoMatch'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  let greeting = 'BIENVENID@S A DELICUPCAKES'
  let about = 'Delicupcakes nació con el objetivo de llevarte la más alta calidad de pastelería'

  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <NavBarContainer />
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
            <Route path='/orders'>
              <OrderListContainer />
            </Route>
            <Route path='/about'>
              <About greeting={about} />
            </Route>
            <Route path='/cart'>
              <CartContainer />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
          <Footer />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
