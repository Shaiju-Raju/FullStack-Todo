import TodoList from "./Pages/TodoList.jsx";
import Login from "./Pages/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
