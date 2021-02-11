import React from 'react'
import { Modal } from 'react-bootstrap'
import './ModalError.css'

export const ModalError = ({ alert, show, handleClose }) => {
  console.log(alert)
  console.log(show)
  console.log(handleClose)
  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{alert.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    </Modal.Body>
    <span className='modalError deliFont'>{alert.message}</span>
  </Modal>
}
