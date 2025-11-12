import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [lista, setLista] = useState([]); 
  const [tarea, setTarea] = useState("");


  
  //Con el useEffect me traigo el get de todas las tareas que tiene el usuario cuando se monta el component, el metodo GET que esta en la documentación del API de 4Geeks

  useEffect(() => {

    async function getTareas(){

      try{
        const response = await fetch("https://playground.4geeks.com/todo/users/javier_velasquez_rojas");
        const data = await response.json();
        setLista(data.todos); 
      } catch (error){

        console.log(error);
      }

    }
     getTareas();
  }, []);

// Acá no uso useEffect por que lo que quiero es setear las tareas con el metodo post y no re imprimir el componente

    async function agregarTarea() {
    const resp = await fetch("https://playground.4geeks.com/todo/todos/javier_velasquez_rojas", {

  // consulto el metodo de la documentación para insertar parametros curl -X 'POST' \
  //'https://playground.4geeks.com/todo/todos/javier_velasquez_rojas' \
  //-H 'accept: application/json' \
  //-H 'Content-Type: application/json' \
  //-d '{
  //"label": "Mover el coche",
  //"is_done": false
  //}'

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: tarea, done: false }),
    });
    const nueva = await resp.json();
    setLista([...lista, nueva]);
    setTarea("");
  }

// Async para borrar tareas que va en el button de la lista

async function borrarTarea(id) {
  try {
    const response = await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      // 204 = borrado exitoso
      setLista((prev) => prev.filter((t) => t.id !== id));
    } else {
      console.error("Error al borrar:", response.status);
    }
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
  }
}



  return (
    <div className="text-center">
      <h1 className="text-center mt-5">La lista de tareas con Fetch</h1>
      <ul >
        
        {lista.map((item) => (<li key={item.id}>{item.label} <span> ---- </span> 
        <button  onClick={() => borrarTarea(item.id)} >X</button> 
        </li>))}  
        
      </ul>
	  <br/>

      <input
        type="text"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>



    </div>
  );
};

export default Home;
