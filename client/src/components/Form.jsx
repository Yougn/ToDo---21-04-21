import React, { useState } from "react";
import ToDoList from "./ToDoList";
import ToDoBtn from "./ToDoBtn";
import style from "./Form.module.css";


const Form = (props) => {

    const { text, setInputText, todos, setTodos, filteredTodos, status, createTodo, removeTodo, completeTodo, editTodo,
        setStatus, showAllTasks, showCompletedTasks, showActiveTasks, showCleanList,
        showCompletedTask, showDeletedTask, showAddedTask } = props;
    const [checkboxStatus, setCheckboxStatus] = useState(true);

    const inputTextHandler = (evt) => {
        const currentValue = evt.target.value;
        setInputText(currentValue);
    };

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
    
    const deactiveTodos = todos.every(todo => todo.completed);

    const checkboxHandler = (evt) => {
        evt.preventDefault();

        if (deactiveTodos) {
            setTodos(todos.map((el) => {
                if (el.completed) {
                    return {
                        ...el, completed: false
                    }
                }
                return el;
            }));
        } else {
            setTodos(todos.map((el) => {
                if (!el.completed) {
                    return {
                        ...el, completed: true
                    }
                }
                return el;
            }));
        }

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
            <ToDoList todos={todos} setTodos={setTodos} removeTodo={removeTodo} completeTodo={completeTodo} editTodo={editTodo} filteredTodos={filteredTodos} showAddedTask={showAddedTask}
                showDeletedTask={showDeletedTask} showCompletedTask={showCompletedTask} />
            <ToDoBtn todos={todos} setTodos={setTodos} status={status} setStatus={setStatus} showCleanList={showCleanList}
                showAllTasks={showAllTasks} showCompletedTasks={showCompletedTasks} showActiveTasks={showActiveTasks} />
        </form>
    )
};

export default Form;