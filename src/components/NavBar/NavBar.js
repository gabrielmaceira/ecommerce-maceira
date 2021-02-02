import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget'
import { CartContext } from '../../context/CartContext'
import logo from '../../img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
  const { qyInCart } = useContext(CartContext)

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
              <CartWidget />
              <Badge pill variant="primary">{qyInCart}</Badge>
            </Nav.Link>
            <span className="vertical-divider ml-2 mr-2"></span>
          </React.Fragment>
        }
        <NavLink to={'/'} className='navlink'>Home</NavLink>

        {/* uso de as=Link para hacer que se comporte como un componente Link */}
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to={`/category/cupcakes_rellenos`}>Cupcakes rellenos</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/cupcakes_sin_relleno`}>Cupcakes sin relleno</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/masas_finas`}>Masas finas</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/chocolates`}>Chocolates</NavDropdown.Item>
        </NavDropdown>

        <NavLink to={'/about'} className='navlink'>Sobre nosotros</NavLink>

      </Nav>
    </Navbar.Collapse>
  </Navbar>)

}