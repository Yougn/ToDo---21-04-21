import React, { useState, useCallback } from "react";
import ToDoList from "./ToDoList";
import ToDoBtn from "./ToDoBtn";
import style from "./Form.module.css";
import axios from "axios";


const Form = (props) => {

    const { text, setInputText, todos, setTodos, filteredTodos, status, setStatus, showAllTasks, showCompletedTasks,
        showActiveTasks, showCleanList, removeTodoAll, showCompletedTask, showDeletedTask, showAddedTask } = props;
    const [checkboxStatus, setCheckboxStatus] = useState(true);

    const inputTextHandler = (evt) => {
        const currentValue = evt.target.value;
        setInputText(currentValue);
    };

    const createTodo = useCallback(async () => {
        if (!text) return null;
        try {
            await axios.post('/api/todo/add', { text }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setTodos([...todos,
                {
                    text: text,
                    completed: false,
                    id: response.data._id
                }]);
                setInputText("");
            });
        } catch (error) { console.log(error) };
    }, [text, setInputText, todos, setTodos]);

    const pressKeyDownTodoHandler = (evt) => {
        if (!text.trim() || 0 === text.length) {
            return;
        };

        if (evt.keyCode === 13) {
            evt.preventDefault();
            createTodo();
            showAddedTask();
        };
    };

    const completeTodoAll = useCallback(async () => {
        try {
            await axios.put(`/api/todo/complete`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                setTodos(todos.map((el) => {
                    if (!el.completed) {
                        return {
                            ...el, completed: true
                        }
                    }
                    return el;
                }));
            });
        } catch (error) { console.log(error) };
    }, [todos, setTodos]);


    const uncompleteTodoAll = useCallback(async () => {
        try {
            await axios.put(`/api/todo/uncomplete`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                setTodos(todos.map((el) => {
                    if (el.completed) {
                        return {
                            ...el, completed: false
                        }
                    }
                    return el;
                }));
            });
        } catch (error) { console.log(error) };
    }, [todos, setTodos]);

    const deactiveTodos = todos.every(todo => todo.completed);

    const checkboxHandler = (evt) => {
        evt.preventDefault();

        if (deactiveTodos) {
            uncompleteTodoAll()
        } else {
            completeTodoAll()
        };

        if (checkboxStatus) {
            setCheckboxStatus(false);
        } else if (!checkboxStatus) {
            setCheckboxStatus(true);
        };
    };


    return (
        <form className={style.form} >
            {todos.length > 0 ? <button onClick={checkboxHandler} className={!deactiveTodos ? style.edit : style.done} type="button" /> : " "}
            <input onChange={inputTextHandler} onKeyDown={pressKeyDownTodoHandler} value={text}
                className={style.textInput} type="text" autoFocus={true} placeholder="What needs to be done?" required />
            <ToDoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}
                showAddedTask={showAddedTask} showDeletedTask={showDeletedTask} showCompletedTask={showCompletedTask} />
            <ToDoBtn todos={todos} setTodos={setTodos} status={status} setStatus={setStatus}
                showCleanList={showCleanList} showAllTasks={showAllTasks} showCompletedTasks={showCompletedTasks}
                showActiveTasks={showActiveTasks} removeTodoAll={removeTodoAll} />
        </form>
    )
};

export default Form;