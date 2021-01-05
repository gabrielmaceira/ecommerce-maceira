import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
        <Nav.Link href="#home" className="text-white">Home</Nav.Link>
        <Nav.Link href="#carrito" className="text-white">Carrito</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Link 1</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Link 2</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Link 3</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)

}