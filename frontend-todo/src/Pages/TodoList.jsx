import { useState, useEffect } from "react";
import "../App.css";
import CreateArea from "../Components/CreateArea";
import Todos from "../Components/Todos";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");   // back to login
    }
  }, []);

  // Declaration of todos state
  const [toDos, setToDos] = useState([]);

  //Fetching data from API and update toDos state
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/todos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setToDos(data);
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    fetchTodos();
  }, []);

  // Adding Item to toDos
  async function addItem(text) {
    if (text.trim() === "") return;

    const res = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });

    const newTodo = await res.json();
    setToDos(prevValue => [...prevValue, newTodo]);
  }

  //Delete Item from toDos
  async function deleteItem(id) {
    const res = await fetch(`${API_URL}/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setToDos(prevValue => prevValue.filter((todo) => todo.id !== id));
  }

  // Updating Item from toDos
  async function editItem(id) {
    const text = prompt("Enter the new Item");
    if (text.trim() === "") return;

    const res = await fetch(`${API_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });

    const updatedData = await res.json();
    setToDos(prevValue => prevValue.map((todo) =>
      todo.id === id ? updatedData : todo
    ));
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
  );
}





