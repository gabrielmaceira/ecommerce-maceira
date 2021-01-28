import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

export const Cart = () => {

  const { itemsInCart } = useContext(CartContext)

  return <React.Fragment>
    <h1>Este seria el Cart</h1>
    <h2>Items en el carrito</h2>

    {itemsInCart.length > 0 && itemsInCart.map(e => {
      return <div key={e.item.id} style={{marginLeft: "100px"}}>
        <br/>
        ID {e.item.id}
        <br/>
        <img alt={e.item.id} src={e.item.photo} style={{maxWidth: "200px"}}></img>
        <br/>
        title {e.item.title}
        <br/>
        description {e.item.description}
        <br/>
        price{e.item.price}
        <br/>
        stock {e.item.stock}
        <br/>
        cantidad elegida {e.qy}
      </div>
    })}
  </React.Fragment>

}