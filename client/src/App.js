import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {

  const [text, setInputText] = useState("");
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

  const createTodo = useCallback(async () => {
    try {
      await axios.post('/api/todo/add', { text }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setTodos([...todos,
          {
            text: text,
            completed: false,
            id: response.data._id
          }]);
          setInputText("");
        });
    } catch (error) { };
  }, [text, todos]);

  const removeTodo = useCallback(async (id) => {
    try {
      await axios.delete(`/api/todo/delete/${id}`, { id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => setTodos(todos.filter(el => el.id !== id)));
    } catch (error) { };
  }, [setTodos, todos]);

  const editTodo = useCallback(async (text, id) => {
    try {
      await axios.put(`/api/todo/edit/${id}`, { text }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(() => { })
    } catch (error) { }
  }, [])

  const completeTodo = useCallback(async (id) => {
    try {
      await axios.put(`/api/todo/complete/${id}`, { id }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(() => {
          setTodos(todos.map((el) => {
            if (el.id === id) {
              if (el.completed) {
                showAddedTask();
                return {
                  ...el, completed: false
                }
              } else {
                showCompletedTask();
                return {
                  ...el, completed: true
                }
              }
            }
            return el;
          }));
        });
    } catch (error) { };
  }, [todos]);

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
        <Form todos={todos} createTodo={createTodo} removeTodo={removeTodo} completeTodo={completeTodo} editTodo={editTodo}
          setTodos={setTodos}
          text={text}
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
