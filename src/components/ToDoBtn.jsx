import React from "react";
import style from "./ToDoBtn.module.css";


const Tasks = {
    ALL: "all",
    COMPLETED: "completed",
    ACTIVE: "active"
};

const ToDoBtn = (props) => {

    const { todos, setTodos, setStatus, showCleanList,
        showAllTasks, showCompletedTasks, showActiveTasks } = props;

    const statusHandler = (evt) => {
        evt.preventDefault();

        const currentValue = evt.target.value;
        if (currentValue === Tasks.ALL) {
            showAllTasks();
        } else if (currentValue === Tasks.COMPLETED) {
            showCompletedTasks()
        } else if (currentValue === Tasks.ACTIVE) {
            showActiveTasks()
        };

        setStatus(currentValue);
    };

    const clearHandler = (evt) => {
        evt.preventDefault();
        showCleanList();
        setTodos(todos.filter(todo => !todo.completed));
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
                    <button onClick={statusHandler} value="all" className={style.filterTodo}>All</button>
                    <button onClick={statusHandler} value="completed" className={style.filterTodo}>Completed</button>
                    <button onClick={statusHandler} value="active" className={style.filterTodo}>Active</button>
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