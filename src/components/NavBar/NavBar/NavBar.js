import React, { useContext, useState } from 'react'
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { CartWidget } from '../../Cart/CartWidget/CartWidget'
import { CartContext } from '../../../context/CartContext'
import { UserContext } from '../../../context/UserContext'
import { LoginForm } from '../../LoginForm/LoginForm'
import logo from '../../../img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export const NavBar = ({ categories }) => {
  const { qyInCart } = useContext(CartContext)
  const { userData, clearData } = useContext(UserContext)

  // mostrar el modal de registro/login
  const [show, setShow] = useState(false)

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

    <LoginForm show={show} handleClose={() => setShow(false)} loginState={true} />

  </Navbar>)

}