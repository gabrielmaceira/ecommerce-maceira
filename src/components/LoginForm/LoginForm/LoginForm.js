import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { Error } from '../../Error/Error'
import './LoginForm.css'

export const LoginForm = ({ doSignUp, doLogin, show, handleClose, login, setLogin, errors }) => {

  const closeModal = () => {
    handleClose()
    setLogin(true)
  }

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

  return (<Modal show={show} onHide={closeModal}>
    {/* si el state es login muestra la form de login, si muestra la de registro */}
    {login ? <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Logueate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={doLogin}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" />
          </Form.Group>
          <Row className='justify-content-end'>
            <Col xs={6}>
              <Button className='btn-block' variant="primary" type="submit">Enviar</Button>
            </Col>
            <Col xs={6}>
              <Button className='btn-block' variant="danger" onClick={closeModal}>Cancelar</Button>
            </Col>
          </Row>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Row className='w-100 text-right'>
          <Col>
            ¿No tenés cuenta? <button className='loginLink' onClick={() => setLogin(false)}>Registrate</button>
          </Col>
        </Row>
      </Modal.Footer>
    </React.Fragment>
      :
      <React.Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Registrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={doSignUp}>
            <Form.Group controlId="formGroupFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control required type="text" placeholder="Nombre"
                className={hasError("firstName") && 'is-invalid'} />
              <Error display={hasError("firstName") ? 'inline-block' : 'none'}
                message={hasError("firstName") && 'El nombre debe contener visibles y no sólo espacios'} />
            </Form.Group>

            <Form.Group controlId="formGroupLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control required type="text" placeholder="Apellido"
                className={hasError("lastName") && 'is-invalid'} />
              <Error display={hasError("lastName") ? 'inline-block' : 'none'}
                message={hasError("lastName") && 'El apellido debe contener visibles y no sólo espacios'} />
            </Form.Group>

            <Form.Group controlId="formGroupAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control required type="text" placeholder="Dirección"
                className={hasError("address") && 'is-invalid'} />
              <Error display={hasError("address") ? 'inline-block' : 'none'}
                message={hasError("address") && 'La dirección debe contener visibles y no sólo espacios'} />
            </Form.Group>

            <Form.Group controlId="formGroupPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control required type="text" placeholder="Teléfono"
                className={hasError("phone") && 'is-invalid'} />
              <Error display={hasError("phone") ? 'inline-block' : 'none'}
                message={hasError("phone") && 'El teléfono sólo admite números'} />
            </Form.Group>

            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password"
                className={hasError("password") && 'is-invalid'} />
              <Error display={hasError("password") ? 'inline-block' : 'none'}
                message={hasError("password") && 'La contraseña debe contener entre 8 y 15 caracteres, con al menos un número, una minúscula, y una mayúscula'} />
            </Form.Group>

            <Form.Group controlId="formGroupRepeatPassword">
              <Form.Label>Repetir Password</Form.Label>
              <Form.Control required type="password" placeholder="Repetir Password"
                className={hasError("repeatPassword") && 'is-invalid'} />
              <Error display={hasError("repeatPassword") ? 'inline-block' : 'none'}
                message={hasError("repeatPassword") && 'Las contraseñas no concuerdan'} />
            </Form.Group>

            <Row className='justify-content-end'>
              <Col xs={6}>
                <Button className='btn-block' variant="primary" type="submit">Enviar</Button>
              </Col>
              <Col xs={6}>
                <Button className='btn-block' variant="danger" onClick={closeModal}>Cancelar</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Row className='w-100 text-right'>
            <Col>
              ¿Ya tenés cuenta? <button className='loginLink' onClick={() => setLogin(true)}>Logueate</button>
            </Col>
          </Row>

        </Modal.Footer>
      </React.Fragment>
    }
  </Modal >)
}