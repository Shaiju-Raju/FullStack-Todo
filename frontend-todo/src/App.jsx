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
    const newTodo = {
      id: Date.now(),
      text: item
    }
    setToDos(prevValue =>  [...prevValue, newTodo]  )
  }

  function deleteItem (id) {
    setToDos(prevValue => prevValue.filter((todo) => todo.id !== id));
  }

  function editItem (id) {
    const updatedData = prompt("Enter the new Item");
    if(updatedData.trim() === "") return;
        setToDos(prevValue => prevValue.map((todo) =>
        todo.id === id ? {...todo, text: updatedData} : todo
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
