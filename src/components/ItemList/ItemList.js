import React from 'react'
import { Item } from '../Item/Item'
import { Row } from 'react-bootstrap'

export const ItemList = ({ items }) => {

  return (<Row className='justify-content-between ml-md-4 mr-md-4 mt-4'>
    {items !== undefined &&
      items.map(item => {
        return <Item
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          pictureUrl={item.pictureUrl} />
      })
    }
  </Row>)

}