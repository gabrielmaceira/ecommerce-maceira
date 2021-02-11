import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { InputForm } from './InputForm'
import './LoginForm.css'

export const LoginForm = ({ doSignUp, doLogin, show, handleClose, login, setLogin, errors }) => {

  const closeModal = () => {
    handleClose()
    setLogin(true)
  }

  return (<Modal show={show} onHide={closeModal}>
    {/* si el state es login muestra la form de login, si muestra la de registro */}
    {login ? <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Logueate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={doLogin}>
          <InputForm controlId="formGroupEmail" label="Email" type="email" id="email" errors={errors} />
          <InputForm controlId="formGroupPassword" label="Password" type="password" id="password" errors={errors} />
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
            <InputForm
              controlId="formGroupFirstName"
              label="Nombre"
              type="text"
              id="firstName"
              error="El nombre debe contener visibles y no sólo espacios"
              errors={errors} />
            <InputForm
              controlId="formGroupLastName"
              label="Apellido"
              type="text"
              id="lastName"
              error="El apellido debe contener visibles y no sólo espacios"
              errors={errors} />
            <InputForm
              controlId="formGroupAddress"
              label="Dirección"
              type="text"
              id="address"
              error="La dirección debe contener visibles y no sólo espacios"
              errors={errors} />
            <InputForm
              controlId="formGroupPhone"
              label="Teléfono"
              type="text"
              id="phone"
              error="El teléfono sólo admite números"
              errors={errors} />
            <InputForm
              controlId="formGroupEmail"
              label="Email"
              type="email"
              id="email"
              errors={errors} />
            <InputForm
              controlId="formGroupPassword"
              label="Password"
              type="password"
              id="password"
              error="La contraseña debe contener entre 8 y 15 caracteres, con al menos un número, 
              una minúscula, y una mayúscula"
              errors={errors} />
            <InputForm
              controlId="formGroupRepeatPassword"
              label="Repetir Password"
              type="password"
              id="repeatPassword"
              error="Las contraseñas no concuerdan"
              errors={errors} />

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