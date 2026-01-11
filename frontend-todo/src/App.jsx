import { useState, useEffect } from 'react'
import './App.css'
import CreateArea from './Components/CreateArea'
import Todos from './Components/Todos';

function App() {

  const API_URL = import.meta.env.VITE_API_URL;


  // Declaration of todos state
  const [toDos, setToDos] = useState([]);

  //Fetching data from API and update toDos state
  useEffect( () => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/todos`);
        const data = await res.json();
        setToDos(data);

      } catch (err) {
        console.err(err);
      }
    };
    fetchTodos();
  },[]);



  // Adding Item to toDos
   async function addItem (text) {
    if(text.trim() === "") return;
    
    const res = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: {
        "content-type" : "application/json",
      },
      body: JSON.stringify({text}),
    });

    const newTodo = await res.json();
    setToDos(prevValue =>  [...prevValue, newTodo]  )
  };

  //Delete Item from toDos
  async function deleteItem (id) {
    const res = await fetch(`${API_URL}/api/todos/${id}`, {
      method: "DELETE",
    });

    setToDos(prevValue => prevValue.filter((todo) => todo.id !== id));
  }



// Updating Item from toDos
  async function editItem (id) {
    const text = prompt("Enter the new Item");
    if(text.trim() === "") return;

    const res = await fetch(`${API_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "content-type" : "application/json",
      },
      body: JSON.stringify({text}),
    })

      const updatedData = await res.json();
        setToDos(prevValue => prevValue.map((todo) =>
        todo.id === id ?  updatedData : todo
      )
    )
  }


  return (
    <>
    <div className="container">
      <h2 className="todo-title">To Do List</h2>
      <CreateArea onAdd={addItem} />

      {toDos.map((toDoItem) => (
        <Todos
          toDo={toDoItem.text}
          key={toDoItem.id}
          id={toDoItem.id}
          onDelete={deleteItem}
          onEdit={editItem}
        />
        ))}
    </div>

    </>
  )
}

export default App
