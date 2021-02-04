import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ItemList } from '../ItemList/ItemList'
import { Loader } from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../firebase'
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
      setIsLoading(true)

      // carga de firestore
      const db = getFirestore()
      let itemCollection = db.collection("items")
      
      
      if (id !== undefined) {
        itemCollection = itemCollection.where('category','==',id)
      }
      else {
        // no hay 20 items en la base pero por las dudas
        itemCollection = itemCollection.limit(20)
      }

      itemCollection.get().then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log("Sin resultados")
        }
        setItems(querySnapshot.docs.map(doc => {
          const fullData = {id: doc.id, ...doc.data()}
          return fullData}))
      }).catch((error) => {
        console.log("Error trayendo los resultados", error)
      }).finally(()=> {
        setIsLoading(false)
      })
  }, [id])

  return (
    <Container fluid className='text-center'>
      <Row className='greetBack center text-center'>
        <Row>
          <Col className='greetHome slide-animate opacity-zero'>
            {greeting}
          </Col>
        </Row>
      </Row>

      {isLoading ? <Loader /> :
      items && items.length > 0 ? <ItemList items={items} /> :
      <h3 className='mt-5 deliFont'>No se encontraron items para esta categoría</h3>
    }
    </Container>
  )

}