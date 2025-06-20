
function crearToDo (texto){
  const contenedor_to_do_html = document.getElementById("to-do-tasks-container")

  const tarea_div = document.createElement("div");
  tarea_div.className = "container-to-do";
  tarea_div.id = "container-to-do"
  tarea_div.innerHTML = `
    <div class="container-checkbox-texto">
      <input type="checkbox" class="checkbox">
      <p class="texto-to-do">${texto}</p>
    </div>
    <button class="boton-delete" id="boton-delete">Delete</button>
  `;

  contenedor_to_do_html.appendChild(tarea_div);

  tarea_div.querySelector(".boton-delete").addEventListener("click", function(){
    tarea_div.remove( )
  })
}

const formulario_html = document.getElementById("formulario")
formulario_html.addEventListener("submit", function(event){

  event.preventDefault()

  const to_do_mensaje = event.target.input.value
  if(to_do_mensaje !== ''){
    const to_do_capitalizado = to_do_mensaje.charAt(0).toUpperCase() + to_do_mensaje.slice(1).toLowerCase()
    crearToDo(to_do_capitalizado)
  }

  event.target.input.value = ""
})
