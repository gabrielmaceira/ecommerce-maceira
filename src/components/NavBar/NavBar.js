import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget'
import logo from '../../img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {

  return (<Navbar expand="md" id="navbar-bg">
    <Navbar.Brand id="brand">
      <Link to={'/'}>
        <img src={logo} className='header-logo' alt="logo" />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto mr-5 center">
        <Nav.Link href="#carrito" className="text-white"><CartWidget /></Nav.Link>
        <span className="vertical-divider ml-2 mr-2"></span>

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