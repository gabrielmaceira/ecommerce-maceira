import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { Error } from '../Error/Error'
import { UserContext } from '../../context/UserContext'
import { getFirestore } from '../../firebase'
import CryptoJS from 'crypto-js'
import './LoginForm.css'

export const LoginForm = ({ show, handleClose, loginState }) => {

  const [login, setLogin] = useState(loginState)
  const [errors, setErrors] = useState([])

  const { setUserData } = useContext(UserContext)

  const closeModal = () => {
    handleClose()
    setLogin(true)
  }

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

  const doLogin = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    // Encrypt
    var encPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)

    // carga de firestore
    const db = getFirestore()
    const userCollection = db.collection("users")
    const user = userCollection.where('email', '==', email).where('password', '==', encPassword)

    user.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        return alert("Los datos ingresados son incorrectos")
      }
      else {
        const userInfo = querySnapshot.docs.map(doc => {
          const fullData = { id: doc.id, ...doc.data() }
          return fullData
        })
        setUserData(userInfo[0])
        alert(`Bienvenido ${userInfo[0].firstName}`)
        handleClose()
      }
    }).catch((error) => {
      console.log("Error trayendo los resultados", error)
    }).finally(() => {
    })
  }

  const doSignUp = (e) => {
    e.preventDefault()

    let errorList = []

    const firstName = e.target[0].value
    const lastName = e.target[1].value
    const address = e.target[2].value
    const phone = e.target[3].value
    const email = e.target[4].value
    const password = e.target[5].value
    const repeatPassword = e.target[6].value

    const regNumbers = new RegExp('^\\d+$')
    const passTest = new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}')

    console.log(passTest.test(password))

    if (firstName.trim() === '') {
      errorList.push("firstName")
    }

    if (lastName.replace(/\s+/g, "") === '') {
      errorList.push("lastName")
    }

    if (address.replace(/\s+/g, "") === '') {
      errorList.push("address")
    }

    if (phone.replace(/\s+/g, "") === '' || !regNumbers.test(phone)) {
      errorList.push("phone")
    }

    if (password.replace(/\s+/g, "") === '' || !passTest.test(password)) {
      errorList.push("password")
    }

    if (password !== repeatPassword) {
      errorList.push("repeatPassword")
    }

    if (errorList.length === 0) {

      // carga de firestore
      const db = getFirestore()
      const userCollection = db.collection("users")
      const user = userCollection.where('email', '==', email)

      user.get().then((querySnapshot) => {
        if (querySnapshot.size !== 0) {
          return alert("Ya existe un usuario registrado con este mail.")
        }
        else {
          // Encrypt
          const encPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)

          const newUser = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email,
            password: encPassword,
          }

          userCollection.add(newUser).then(({ id }) => {
            alert("Gracias por registrarte")
            setLogin(true)
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch((error) => {
        console.log("Error trayendo los resultados", error)
      }).finally(() => {
      })

    }

    setErrors(errorList)

  }

  return (<Modal show={show} onHide={closeModal}>
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