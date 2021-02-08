import React from 'react'
import { Item } from '../Item/Item'
import { Container, Row } from 'react-bootstrap'

export const ItemList = ({ items }) => {

  return (<Container>
    <Row className='ml-md-4 mr-md-4 mt-4'>
      {items !== undefined &&
        items.map(item => {
          return <Item
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            pictureUrl={item.pictureUrl} 
            stock={item.stock} />
        })
      }
    </Row>
  </Container>)

}