import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import {disableButton, enableButton} from '../../Utils/EnableDisableTag'
import './ItemCount.css'

// uso carpeta Utils para funciones de deshabilitado y habilitado de tags por ID

export const ItemCount = ({ stock, initial, onAdd }) => {
  // iniciar el contador con el valor initial
  const [count, setCount] = useState(Number(initial))

  // deshabilitar los botones de aumentar o reducir la cantidad si el contador es 1 o igual al stock actual
  useEffect(() => {
    count <= 1 ?
      disableButton('reduceBtn')
      : enableButton('reduceBtn')

    count >= Number(stock) ?
      disableButton('addBtn')
      : enableButton('addBtn')
  },
    [count, stock])

  // deshabilitar el boton de Agregar al carrito si el stock es 0. Es lo que entendi con el uso de onAdd (?),
  // ya que los botones de aumentar o reducir la cantidad no pueden hacer que el contador supere al stock
  useEffect(() => {
    Number(stock) === 0 && disableButton('onAdd')
  })

  // aumentar el contador en 1
  const addCount = () => {
    count < Number(stock) && setCount(count + 1)
  }

  // disminuir el contador en 1
  const reduceCount = () => {
    count > 1 && setCount(count - 1)
  }

  // llamada a addToCart desde el boton Agregar al carrito, que llama a onAdd solamente si es valido 
  // i.e. (contador es al menos 1 Y es menor o igual al stock disponible)
  // esta funcion falla ya que onAdd no esta definida
  const addToCart = () => {
    count >= 1 && count <= Number(stock) && onAdd(count)
  }

  return (
    <React.Fragment>
      <Col>
        <Row className='text-center'>
          <Col className='btn btn-light boton-cont' id='reduceBtn' onClick={reduceCount}>
            -
            </Col>
          <Col className='align-center contador'>
            {count}
          </Col>
          <Col className='btn btn-light boton-cont' id='addBtn' onClick={addCount}>
            +
            </Col>
        </Row>
        <Row>
          <Button variant='outline-dark btn-block mt-1 mb-4' id='onAdd' onClick={addToCart}>
            Agregar al carrito
            </Button>
        </Row>

      </Col>
    </React.Fragment>
  )

}