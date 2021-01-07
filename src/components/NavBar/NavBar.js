import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget'
import logo from '../../img/logo.png'
import './NavBar.css'

export const NavBar = () => {

  return (<Navbar expand="md" id="navbar-bg">
    <Navbar.Brand href="#home" id="brand">
      <img src={logo} className='header-logo' alt="logo" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto mr-5">
        <Nav.Link href="#carrito" className="text-white"><CartWidget /></Nav.Link>
        <Nav.Link href="#home" className="text-white">Home</Nav.Link>
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Cupcakes rellenos</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Cupcakes sin relleno</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Masas finas</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Chocolates</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#home" className="text-white">Sobre Nosotros</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)

}