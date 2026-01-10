import { useState } from 'react'
import './App.css'
import CreateArea from './Components/CreateArea'
import Todos from './Components/Todos';

function App() {

  // Declaration of todos state
  const [toDos, setToDos] = useState([]);

  // Adding Item to toDos
  function addItem (item) {
    if(item.trim() === "") return;
    setToDos(prevValue =>  [...prevValue, item]  )
  }

  function deleteItem (id) {
    setToDos(prevValue => prevValue.filter((todo,index) => index !== id));
    console.log("clicked")
  }

  function editItem (id) {
    const updatedData = prompt("Enter the new Item");
    if(updatedData.trim() === "") return;
        setToDos(prevValue => prevValue.map((todo,index) =>
        index === id ? updatedData : todo
      )
    )
  }


  return (
    <>
    <div className="container">
      <h2 className="todo-title">To Do List</h2>
      <CreateArea onAdd={addItem} />

      {toDos.map((toDoItem, index) => (
        <Todos
          toDo={toDoItem}
          key={index}
          id={index}
          onDelete={deleteItem}
          onEdit={editItem}
        />
        ))}
    </div>

    </>
  )
}

export default App
