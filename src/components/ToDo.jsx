import React from "react";


const ToDo = (props) => {
    const { text, todo, todos, setTodos } = props;

    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    };

    const completeHandler = () => {
        setTodos(todos.map((el) => {
            if (el.id === todo.id) {
                return {
                    ...el, completed: !el.completed
                }
            }
            return el;
        }));
    };

    const editHandler = (evt) => {
        setTodos(todos.map(el => {
            if (el.id === todo.id) {
                return {
                    ...todo,
                    text: evt.target.value
                };
            }
            return el;
        }));
    };

    return (
        <div className="todo">
            <input onChange={editHandler} value={text} type="text" className={`todo-item  ${todo.completed ? "completed" : " "}`} ></input>
            <button onClick={completeHandler} className="complete-btn">
            </button>
            <button onClick={deleteHandler} className="trash-btn">
            </button>
        </div>
    )
};

export default ToDo;