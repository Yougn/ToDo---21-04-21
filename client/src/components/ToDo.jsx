import React, { useState, useEffect } from "react";
import style from "./ToDo.module.css"


const ToDo = (props) => {

    const { text, todo, todos, setTodos, showDeletedTask, 
        removeTodo, completeTodo, editTodo } = props;
    const [show, setShow] = useState(false);
    const [isReadonly, setReadonly] = useState(true);

    useEffect(() => {
        document.addEventListener("click", readOnlyHandler);
        return () => {
            document.removeEventListener("click", readOnlyHandler);
        };
    }, []);

    const readOnlyHandler = (evt) => {
        const target = evt.target;
        if (!target.closest(".todo")) {
            setReadonly(true);
        };
    };

    const mouseEnterHandler = () => {
        const activeId = todo.id;
        const activeTodo = todos.find((el) => el.id === activeId);
        setShow(activeTodo);
    };

    const completeHandler = () => {
        completeTodo(todo.id);
    };

    const editHandler = (evt) => {
        editTodo(evt.target.value, todo.id)
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

    const deleteHandler = (evt) => {
        evt.preventDefault();
        removeTodo(todo.id);
        showDeletedTask();
    };

    return (
        <div onMouseMove={mouseEnterHandler} onMouseLeave={() => (setShow(false))} className={style.todo} >
            <input onClick={completeHandler} className={style.chk} type="checkbox" id="chk" checked={todo.completed} readOnly />
            <input onDoubleClick={() => setReadonly(false)} onChange={editHandler} readOnly={isReadonly}
                className={style.formControl
                    + `${todo.completed ? " " + style.completed : " "}`} value={text} type="text">
            </input>
            {show && <button onClick={deleteHandler} className={style.trashBtn} />}
        </div>
    )
};

export default ToDo;