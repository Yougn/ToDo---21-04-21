import React from "react";


const ToDoBtn = (props) => {
    const { todos, setTodos, setStatus } = props;

    const statusHandler = (evt) => {
        setStatus(evt.target.value)
    };

    const clearHandler = () => {
        setTodos(todos.filter(todo => !todo.completed))
    };

    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);
    console.log(completedTodos)
    return (
        <>
            {todos.length > 0 ? <div className="filter-container">

                <div>
                    <span>{activeTodos.length}left</span>
                </div>
                <div>
                    <button onClick={statusHandler} value="all" className="filter-todo">All</button>
                    <button onClick={statusHandler} value="completed" className="filter-todo">Completed</button>
                    <button onClick={statusHandler} value="active" className="filter-todo">Active</button>
                </div>
                { completedTodos.length > 0 ?
                    <div>
                        <button onClick={clearHandler} className="filter-todo">Clear completed</button>
                    </div> :
                    " "
                }
            </div> : " "}
        </>
    )
};

export default ToDoBtn;