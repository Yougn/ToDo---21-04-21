import React from "react";
import ToDoList from "./ToDoList";
import ToDoBtn from "./ToDoBtn";
import style from "./Form.module.css";


const Form = (props) => {

    const { inputText, setInputText, todos, setTodos, filteredTodos, setStatus } = props;

    const inputTextHandler = (evt) => {
        setInputText(evt.target.value)
    };

    const pressKeyDownTodoHandler = (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            setTodos([...todos,
            {
                text: inputText,
                completed: false,
                id: Math.random() * 1000
            }]);
            setInputText("");
        };
    };

    const checkboxHandler = (evt) => {
        evt.preventDefault();
        setTodos(todos.map((el) => {
            if (!el.completed) {
                return {
                    ...el, completed: true
                }
            }
            return el;
        }));
    };

    const activeTodos = todos.filter(todo => !todo.completed);

    return (
        <form className={style.form} >
            {todos.length > 0 ? <button onClick={checkboxHandler} className={ activeTodos.length > 0 ? style.edit : style.done } type="button"/> : " "}
            <input onChange={inputTextHandler} onKeyDown={pressKeyDownTodoHandler} value={inputText}
                className={style.textInput} type="text" autoFocus={true} placeholder="What needs to be done?" />
            <ToDoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
            <ToDoBtn todos={todos} setTodos={setTodos} setStatus={setStatus} />
        </form>
    )
};

export default Form;