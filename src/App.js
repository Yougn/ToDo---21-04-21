import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
    };
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

  const showAddedTask = () => toast("The task is added!");
  const showCompletedTask = () => toast("The task is completed!");
  const showDeletedTask = () => toast("The task is deleted!");

  const showAllTasks = () => toast("All tasks!");
  const showCompletedTasks = () => toast("Completed tasks!");
  const showActiveTasks = () => toast("Active tasks!");
  const showCleanList = () => toast("The list is clean!");

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
          status={status}
          setStatus={setStatus}
          filteredTodos={filteredTodos}
          showAddedTask={showAddedTask}
          showCompletedTask={showCompletedTask}
          showDeletedTask={showDeletedTask}
          showAllTasks={showAllTasks}
          showCompletedTasks={showCompletedTasks}
          showActiveTasks={showActiveTasks}
          showCleanList={showCleanList}
        />
      </div>
      <ToastContainer />
    </div>
  )
};

export default App;
