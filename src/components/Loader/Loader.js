import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {

  return (<React.Fragment>
    <Spinner animation="border" role="status" variant="info" className="mt-2" /> Cargando...
  </React.Fragment>)

}