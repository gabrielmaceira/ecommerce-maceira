import React from 'react'
import { Badge } from 'react-bootstrap'
import { Cart4 } from 'react-bootstrap-icons'

export const CartWidget = ({qyInCart}) => {

  return (<React.Fragment>
    <Cart4 size={25} /><Badge pill variant="primary">{qyInCart}</Badge>
  </React.Fragment>)

}
