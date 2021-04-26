import React, { useState } from "react";
import style from "./ToDo.module.css"


const ToDo = (props) => {

    const { text, todo, todos, setTodos, showCompletedTask, showDeletedTask } = props;
    const [show, setShow] = useState(false);

    const deleteHandler = (evt) => {
        evt.preventDefault();
        showDeletedTask();
        setTodos(todos.filter(el => el.id !== todo.id));
    };

    const completeHandler = () => {
        showCompletedTask();
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

    const mouseEnterHandler = () => {
        const activeId = todo.id;
        const activeTodo = todos.find((el) => el.id === activeId);
        setShow(activeTodo);
    };

    return (
        <div className={style.todo} onMouseMove={mouseEnterHandler} onMouseLeave={() => (setShow(false))}>
            <input className={style.chk + " " + style.hidden} type="checkbox" id="chk" checked={todo.completed} readOnly />
            <label onClick={completeHandler} className={style.label} htmlFor="chk" />
            <input onChange={editHandler} className={style.formControl
                + `${todo.completed ? " " + style.completed : " "}`} value={text} type="text">
            </input>
            {show && <button onClick={deleteHandler} className={style.trashBtn} />}
        </div>
    )
};

export default ToDo;