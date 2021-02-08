  // deshabilitar un boton segun el id
  export const disableButton = (id) => {
    let element = document.getElementById(id)
    element.classList.add("disabled")
  }

  // habilitar un boton segun el id
  export const enableButton = (id) => {
    let element = document.getElementById(id)
    element.classList.remove("disabled")
  }