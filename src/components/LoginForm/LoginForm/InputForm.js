import React from 'react'
import { Error } from '../../Error/Error'
import { Form } from 'react-bootstrap'

export const InputForm = ({ controlId, label, type, id, error, errors }) => {

    // revisa si el input de la form esta en la lista de errores para mostrar el mensaje de error
    const hasError = (value) => {
      let i = 0
      let position = -1
  
      while (i < errors.length && position === -1) {
        if (errors[i] === value) {
          position = i
        }
        i++
      }
  
      return position !== -1
    }

  return <Form.Group controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control required type={type} placeholder={label}
      className={hasError(id) && 'is-invalid'} />
    <Error display={hasError(id) ? 'inline-block' : 'none'}
      message={hasError(id) && error} />
  </Form.Group>
}