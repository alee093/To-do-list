// Cargar las tareas al iniciar la página
toDoLocalStorage()

// Función para cargar las tareas desde localStorage
function toDoLocalStorage() {
  const to_do_local_storage = JSON.parse(localStorage.getItem("to_do")) || []
  for (let tarea of to_do_local_storage) {
    crearToDo(tarea)
  }
}

// Evento para manejar el envío de las tareas
const formulario_html = document.getElementById("formulario")
formulario_html.addEventListener("submit", function(event) {
  event.preventDefault()
  const to_do_mensaje = event.target.input.value

  // Validar que el mensaje no esté vacío
  if (to_do_mensaje !== '') {
    // Capitalizar la primera letra y poner el resto en minúsculas
    const to_do_capitalizado = to_do_mensaje.charAt(0).toUpperCase() + to_do_mensaje.slice(1).toLowerCase()

    // Guardar la tarea en localStorage
    const array_to_do = JSON.parse(localStorage.getItem("to_do")) || []
    array_to_do.push({texto: to_do_capitalizado, checked: false})
    localStorage.setItem("to_do", JSON.stringify(array_to_do))

    // Crear la tarea en el DOM
    crearToDo({ texto: to_do_capitalizado, checked: false })
  }
  event.target.input.value = ""
})

// Función para crear una tarea en el DOM
function crearToDo(tarea) {
  // seleccionar el contenedor de tareas
  const contenedor_to_do_html = document.getElementById("to-do-tasks-container")

  // Crear un nuevo div para la tarea
  const tarea_div = document.createElement("div")
  tarea_div.className = "container-to-do"
  let checkedAttribute = ""
  if (tarea.checked) {
    checkedAttribute = "checked"
  }
  tarea_div.innerHTML = `
    <div class="container-checkbox-texto">
      <input type="checkbox" class="checkbox" ${checkedAttribute}>
      <div class="container-texto-to-do">
        <p class="texto-to-do">${tarea.texto}</p>
      </div>
    </div>
    <button class="boton-delete">Delete</button>
    <div class="container-botones">
      <button class="boton-yes">Yes</button>
      <button class="boton-no">No</button>
    </div>
  `
  // Añadir la tarea al contenedor
  contenedor_to_do_html.appendChild(tarea_div)

  // Evento de eliminar tarea
  tarea_div.querySelector(".boton-delete").addEventListener("click", function() {

    // Ocultar el botón de eliminar
    const boton_delete_html = document.querySelector(".boton-delete")
    boton_delete_html.style.display = "none"
    // Mostrar los botones de confirmación
    const boton_yes_html = document.querySelector(".boton-yes")
    const boton_no_html = document.querySelector(".boton-no")
    boton_yes_html.style.display = "inline"
    boton_no_html.style.display = "inline"

    // Evento de confirmación
    boton_yes_html.addEventListener("click", () =>{
        tarea_div.remove()
        let array_to_do = JSON.parse(localStorage.getItem("to_do")) || []
        array_to_do = array_to_do.filter(function(t) {
          if (t.texto !== tarea.texto) {
            return true
          } else {
            return false
          }
        })
        localStorage.setItem("to_do", JSON.stringify(array_to_do))
    })
    // Evento de cancelación
    boton_no_html.addEventListener("click", () => {
      boton_yes_html.style.display = "none"
      boton_no_html.style.display = "none"
      boton_delete_html.style.display = "inline"
    })
  })

  // Evento de marcar tarea como completada
  const checkbox_html = tarea_div.querySelector(".checkbox")
  const texto_to_do_html = tarea_div.querySelector(".texto-to-do")

  // Si la tarea está checked al cargar, tachar el texto
  if (tarea.checked) {
    texto_to_do_html.style.textDecoration = "line-through red"
  }

  // Evento de marcar tarea como completada
  checkbox_html.addEventListener("change", function(event) {
    let array_to_do = JSON.parse(localStorage.getItem("to_do")) || []
    array_to_do = array_to_do.map(function(t) {
      if (t.texto === tarea.texto) {
        return {
          texto: t.texto,
          checked: event.target.checked
        }
      } else {
        return t
      }
    })
    localStorage.setItem("to_do", JSON.stringify(array_to_do))
    if (event.target.checked) {
      texto_to_do_html.style.textDecoration = "line-through red"
    } else {
      texto_to_do_html.style.textDecoration = "none"
    }
  })
}