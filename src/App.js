import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form"
import ToDoList from "./components/ToDoList"
import ToDoBtn from "./components/ToDoBtn"


const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed));
          break;
        case "active":
          setFilteredTodos(todos.filter(todo => !todo.completed));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    filterHandler();
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>todos</h1>
      </header>
      <div className="todo-container">
        <Form todos={todos}
          setTodos={setTodos}
          inputText={inputText}
          setInputText={setInputText}
          setStatus={setStatus}
        />
        <ToDoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
        <ToDoBtn todos={todos} setTodos={setTodos} setStatus={setStatus} />
      </div>
    </div >
  );
}

export default App;
