import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { objList } from '../../constants/ObjectList'
import { ItemList } from '../ItemList/ItemList'
import { Loader } from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import './ItemListContainer.css'

export const ItemListContainer = ({ greeting }) => {

  // lista de items que es llenada por la promise
  const [items, setItems] = useState(undefined)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  // categoryId
  const { id } = useParams()

  // llenado de lista de items "items" al montarse el componente
  useEffect(() => {
    // promise que va a buscar la lista de items/objetos a nuestra API (archivo estatico) y filtra por categoria
    const retrieveList = new Promise((resolve, reject) => {
      setIsLoading(true)

      setTimeout(() => {
        let filteredList = objList
        if (id !== undefined) {
          filteredList = objList.filter(item => item.category === id)
        }
        objList.length > 0 ? resolve(filteredList) : reject("No hay datos")
      }, 2000)
    })

    retrieveList
      .then((res) => {
        setIsLoading(false)
        setItems(res)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <Container fluid className='text-center'>
      <Row className='greetBack center text-center'>
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

      {isLoading ? <Loader /> :
      <ItemList items={items} />
    }
    </Container>
  )

}