import React from "react";
import ToDo from "./ToDo";


const ToDoList = (props) => {
    const { todos, setTodos, filteredTodos } = props;

    return (
        <div>
            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <ToDo todo={todo}
                    todos={todos} 
                    setTodos={setTodos} 
                    text={todo.text} 
                    id={todo.id} key={todo.id} />
                ))}
            </ul>
        </div>
    )
};

export default ToDoList;