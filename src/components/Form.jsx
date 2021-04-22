import React from "react";


const Form = (props) => {
    const { inputText, setInputText, todos, setTodos } = props;

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
        }
    };

    const checkboxHandler = () => {
        setTodos(todos.map((el) => {
            if (!el.completed) {
                return {
                    ...el, completed: true
                }
            }
            return el;
        }));
    };

    return (
        <form>
            {todos.length > 0 ? <input onClick={checkboxHandler} defaultChecked="true" type="checkbox" className="todo-checkbox" /> : " "}
            <input onChange={inputTextHandler} onKeyDown={pressKeyDownTodoHandler} value={inputText} type="text" className="todo-input" />
        </form>
    )
};

export default Form;