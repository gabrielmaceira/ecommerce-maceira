import React, { useState, useContext } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget'
import { LoginFormContainer } from '../../LoginForm/LoginFormContainer/LoginFormContainer'
import { CartContext } from '../../../context/CartContext'
import { UserContext } from '../../../context/UserContext'
import logo from '../../../img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export const NavBar = ({ categories }) => {

  // mostrar el modal de registro/login
  const [show, setShow] = useState(false)

  // llamada a context de usuario y carrito
  const { qyInCart } = useContext(CartContext)
  const { userData, clearData } = useContext(UserContext)

  return (<Navbar expand="md" id="navbar-bg" className='navbar-dark'>
    <Navbar.Brand id="brand">
      <Link to={'/'}>
        <img src={logo} className='header-logo' alt="logo" />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto mr-5 center">
        {qyInCart > 0 &&
          <React.Fragment>
            <Nav.Link as={Link} to={`/cart`} className="text-white">
              <CartWidget qyInCart={qyInCart}/>
            </Nav.Link>
            <span className="vertical-divider ml-2 mr-2"></span>
          </React.Fragment>
        }
        <NavLink to={'/'} className='navlink'>Home</NavLink>

        {/* uso de as=Link para hacer que se comporte como un componente Link */}
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          {categories && categories.length > 0 &&
            categories.map((category) => {
              return <NavDropdown.Item
                key={category.key}
                as={Link}
                to={`/category/${category.key}`}>{category.name}</NavDropdown.Item>
            })
          }
        </NavDropdown>

        <NavLink to={'/about'} className='navlink'>Sobre nosotros</NavLink>

        {userData === undefined ?
          <NavLink to={'#'} className='navlink ml-1' onClick={() => setShow(true)}>Login</NavLink>
          :
          <NavDropdown title="Perfil" id="basic-nav-dropdown" className='mr-5 dropdown-menu-left'>
            <NavDropdown.Item to={'/orders'} as={Link}>Órdenes</NavDropdown.Item>
            <NavDropdown.Item to={'#'} onClick={() => clearData()}>Logout</NavDropdown.Item>
          </NavDropdown>
        }
      </Nav>
    </Navbar.Collapse>

    <LoginFormContainer show={show} handleClose={() => setShow(false)} handleOpen={() => setShow(true)} loginState={true} />

  </Navbar>)

}