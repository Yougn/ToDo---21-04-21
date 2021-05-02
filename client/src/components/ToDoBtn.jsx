import React, { useCallback } from "react";
import style from "./ToDoBtn.module.css";
import axios from "axios";


const Tasks = {
    ALL: "all",
    COMPLETED: "completed",
    ACTIVE: "active"
};

const ToDoBtn = (props) => {

    const { todos, setTodos, status, setStatus,
        showCleanList, showAllTasks, showCompletedTasks, showActiveTasks } = props;

    const removeTodoAll = useCallback(async () => {
        try {
            await axios.delete(`/api/todo/delete`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => { setTodos(todos.filter(todo => !todo.completed)) });
        } catch (error) { console.log(error) };
    }, [setTodos, todos]);

    const statusHandler = (evt) => {
        evt.preventDefault();

        const currentValue = evt.target.value;
        if (currentValue === Tasks.ALL) {
            showAllTasks();
        } else if (currentValue === Tasks.COMPLETED) {
            showCompletedTasks();
        } else if (currentValue === Tasks.ACTIVE) {
            showActiveTasks();
        };

        setStatus(currentValue);
    };

    const clearHandler = (evt) => {
        evt.preventDefault();
        showCleanList();
        removeTodoAll();
    };

    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <>
            {todos.length > 0 ? <div className={style.filterontainer}>
                <div className={style.text}>
                    {activeTodos.length} items left
                </div>
                <div className={style.filterBox}>
                    <button onClick={statusHandler} value="all"
                        className={status === Tasks.ALL ? style.filterTodo + " " + style.filterTodoActive :
                            style.filterTodo}>All</button>
                    <button onClick={statusHandler} value="completed"
                        className={status === Tasks.COMPLETED ? style.filterTodo + " " + style.filterTodoActive :
                            style.filterTodo}>Completed</button>
                    <button onClick={statusHandler}
                        className={status === Tasks.ACTIVE ? style.filterTodo + " " + style.filterTodoActive :
                            style.filterTodo} value="active">Active</button>
                </div>
                {completedTodos.length > 0 ?
                    <div>
                        <button onClick={clearHandler} className={style.completed}>Clear completed</button>
                    </div> :
                    " "
                }
            </div> : " "}
        </>
    )
};

export default ToDoBtn;