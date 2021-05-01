import React from "react";
import ToDo from "./ToDo";
import style from "./ToDoList.module.css";


const ToDoList = (props) => {

    const { todos, setTodos, filteredTodos, removeTodo, completeTodo,
        showCompletedTask, showAddedTask, showDeletedTask, editTodo } = props;

    return (
        <div>
            <ul className={style.todoList}>
                {filteredTodos.map((todo) => (
                    <ToDo todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} editTodo={editTodo}
                        todos={todos}
                        setTodos={setTodos}
                        text={todo.text}
                        showAddedTask={showAddedTask}
                        showCompletedTask={showCompletedTask}
                        showDeletedTask={showDeletedTask}
                        id={todo.id} key={todo.id} />
                ))}
            </ul>
        </div>
    )
};

export default ToDoList;