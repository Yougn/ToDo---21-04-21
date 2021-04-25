import React from "react";
import style from "./ToDoBtn.module.css";


const ToDoBtn = (props) => {

    const { todos, setTodos, setStatus } = props;

    const statusHandler = (evt) => {
        evt.preventDefault();
        setStatus(evt.target.value);
    };

    const clearHandler = (evt) => {
        evt.preventDefault();
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
                { completedTodos.length > 0 ?
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