import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { objList } from '../../constants/ObjectList'
import { ItemList } from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import './ItemListContainer.css'

export const ItemListContainer = ({ greeting }) => {

  // lista de items que es llenada por la promise
  const [items, setItems] = useState(undefined)

  // categoryId
  const { id } = useParams()

  // promise que va a buscar la lista de items/objetos a nuestra API (archivo estatico)
  const retrieveList = new Promise((resolve, reject) => {
    setTimeout(() => {
      let filteredList = objList
      if (id !== undefined) {
        filteredList = objList.filter(item => item.category === id)
      }
      objList.length > 0 ? resolve(filteredList) : reject("No hay datos")
    }, 2000)
  })

  // llenado de lista de items "items" al montarse el componente
  useEffect(() => {
    retrieveList
      .then((res) => {
        setItems(res)
      })
      .catch((err) => console.log(err))
  })

  return (
    <Container fluid>
      <Row className='greetBack center'>
        <Row>
          <Col className='greetHome slide-animate opacity-zero'>
            {greeting}
          </Col>
        </Row>
        {/*         <Row className='w-100'>
          <Col className='greetHome slide-animate-2 opacity-zero'>
            "MAS TEXTO"
            </Col>
        </Row> */}
      </Row>
      {/*       <Row className='align-center'>
        <ItemCount stock='0' initial='1' />
      </Row> */}
      <ItemList items={items} />
    </Container>
  )

}