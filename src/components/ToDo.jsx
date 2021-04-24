import React, { useState } from "react";
import style from "./ToDo.module.css"


const ToDo = (props) => {

    const { text, todo, todos, setTodos } = props;

    const [show, setShow] = useState(null);

    const deleteHandler = (evt) => {
        evt.preventDefault();
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

    const mouseEnterHandler = () => {
        setShow(todos.filter(el => el.id === todo.id))
    };

    console.log(show);
    return (
        <div className={style.todo}>
            <input className={style.chk + " " + style.hidden} type="checkbox" id="chk" checked={todo.completed} readOnly />
            <label onClick={completeHandler} className={style.label} htmlFor="chk" />
            <input onChange={editHandler} onMouseEnter={mouseEnterHandler} className={style.formControl +
                `${todo.completed ? " " + style.completed : " "}`} value={text} type="text">
            </input>
            { show ? <button onClick={deleteHandler} className={style.trashBtn} /> : " "}
        </div>
    )
};

export default ToDo;