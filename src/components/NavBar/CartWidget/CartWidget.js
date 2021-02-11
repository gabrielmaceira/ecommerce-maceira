import React from 'react'
import { Badge } from 'react-bootstrap'

export const CartWidget = ({qyInCart}) => {
  // icono carrito con la cantidad de items en el mismo
  return (<React.Fragment>
    <i className="fas fa-shopping-cart"><Badge pill variant="primary">{qyInCart}</Badge></i>
  </React.Fragment>)

}
