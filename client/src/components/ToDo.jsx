import React, { useState, useEffect, useCallback } from "react";
import style from "./ToDo.module.css";
import axios from "axios";


const ToDo = (props) => {

    const { text, todo, todos, setTodos, showDeletedTask, showAddedTask, showCompletedTask } = props;
    const [show, setShow] = useState(false);
    const [isReadonly, setReadonly] = useState(true);
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        document.addEventListener("click", readOnlyHandler);
        return () => {
            document.removeEventListener("click", readOnlyHandler);
        };
    }, []);

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, { id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setTodos(todos.filter(el => el.id !== id)));
        } catch (error) { console.log(error) };
    }, [setTodos, todos]);

    const editTodo = useCallback(async (text, id) => {
        try {
            await axios.put(`/api/todo/edit/${id}`, { text }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                setTodos(todos.map(el => {
                    if (el.id === todo.id) {
                        return {
                            ...todo,
                            text: text
                        };
                    }
                    return el;
                }));
            })
        } catch (error) { console.log(error) }
    }, [todo, todos, setTodos]);

    const completeTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/complete/${id}`, { id }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                setTodos(todos.map((el) => {
                    if (el.id === id) {
                        if (el.completed) {
                            showAddedTask();
                            return {
                                ...el, completed: false
                            }
                        } else {
                            showCompletedTask();
                            return {
                                ...el, completed: true
                            }
                        }
                    }
                    return el;
                }));
            });
        } catch (error) { console.log(error) };
    }, [todos, setTodos, showAddedTask, showCompletedTask]);

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
        const newText = evt.target.value;
        setCurrentText(newText);
    };

    const deleteHandler = (evt) => {
        evt.preventDefault();
        removeTodo(todo.id);
        showDeletedTask();
    };

    return (
        <div onMouseMove={mouseEnterHandler} onMouseLeave={() => (setShow(false))} className={style.todo} onBlur={() => { editTodo(currentText, todo.id) }} >
            <input onClick={completeHandler} className={style.chk} type="checkbox" id="chk" checked={todo.completed} readOnly />
            <input onDoubleClick={() => setReadonly(false)} onChange={editHandler} readOnly={isReadonly}
                className={style.formControl + `${todo.completed ? " " + style.completed : " "}`}
                value={currentText ? currentText : text} type="text">
            </input>
            {show && <button onClick={deleteHandler} className={style.trashBtn} />}
        </div>
    )
};

export default ToDo;