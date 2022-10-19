import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Todo from "../components/Todo";
import Alert from "../components/Alert";
import styles from "./Todos.module.css";

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [dones, setDones] = useState([]);
    const [action, setAction] = useState("");
    const [resp, setResp] = useState(0);
    const location = useLocation();
    const token = location.state.token;
    axios.defaults.headers = { 
        Authorization: `Bearer ${token}`
    };

    const handleChangeTodo = (event) => {
        setTodo(event.target.value);
    }

    const getTodos = async() => {
        try {
            setAction("getTodos");
            const resp = await axios.get("https://pre-onboarding-selection-task.shop/todos");
            const data = resp.data;
            if (data.length !== 0) {
                setTodos((current) => [data, ...current]);
            }
        } catch(e) {
            setResp(e.response.status);
        }
    }

    const addTodo = async(e) => {
        e.preventDefault();
        try {
            setAction("addTodo");
            if (todo.length === 0) {
                return;
            } 

            const params = {
                "todo": todo
            }

            const resp = await axios.post("https://pre-onboarding-selection-task.shop/todos", params);
            const data = resp.data;
            setTodos((current) => [data, ...current]);
            setTodo("");
        } catch(e) {
            setResp(e.response.status);
        }
    }

    const updateTodoContent = async(e, {id, todo}) => {
        e.preventDefault();
        try {
            setAction("updateTodoContent");
            const params = {
                "todo": todo,
                "isCompleted": false,
            }

            const resp = await axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`, params);
            const data = resp.data;
            setTodos((current) => {
                let updated = [];
                for(var i = 0; i < current.length; i++) {
                    if (current[i].id === data.id) {
                        let updatedItem = current;
                        updatedItem.todo = data.todo;
                        updated.push(updatedItem);
                        continue;
                    }
                    updated.push(current[i]);
                }

                return updated;
            });
        } catch(e) {
            setResp(e.response.status);
        }
    }

    const updateTodoState = async(e, {id, todo}) => {
        e.preventDefault();
        try {
            setAction("updateTodoState");
            const params = {
                "todo": todo,
                "isCompleted": true,
            }

            const resp = await axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`, params);
            const data = resp.data;
            setTodos((current) => {
                let updated = [];
                for(var i = 0; i < current.length; i++) {
                    if(current[i].id === data.id) {
                        continue;
                    }
                    updated.push(current[i]);
                }

                return updated;
            });

            setDones((current) => [todo, ...current]);
        } catch(e) {
            setResp(e.response.status);
        }
    }

    const deleteTodo = async(e, {id}) => {
        e.preventDefault();
        try {
            setAction("deleteTodo");
            await axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`);
            setTodos((current) => {
                let updated = [];
                for(var i = 0; i < current.length; i++) {
                    if(current[i].id === id) {
                        continue;
                    }
                    updated.push(current[i]);
                }

                return updated;
            });
        } catch(e) {
            setResp(e.response.status);
        }
    }

    useEffect(() => getTodos, []);

    return (
        <div>
            <h1>TODOS</h1>
            <div className={styles.content}>
                <div className={styles.todos}>
                    <h2>할일</h2>
                    <div className={styles.wrapper}>
                        <input
                            className={styles.create_input}
                            value={todo} 
                            onChange={handleChangeTodo} 
                            type="text" 
                            placeholder="할일을 입력해주세요."
                        />
                        <button className={styles.add_btn} onClick={event => addTodo(event)}>추가</button>
                    </div>
                    <div className={styles.wrapper}>
                        <ul>
                            {todos.map((item) =>
                                <Todo 
                                    key={item.id}
                                    id={item.id}
                                    todo={item.todo}
                                    updateTodoState={updateTodoState}
                                    updateTodoContent={updateTodoContent}
                                    deleteTodo={deleteTodo}
                                />
                            )}
                        </ul>
                    </div>
                </div>
                <div className={styles.dones}>
                    <h2>완료한 일</h2>
                    <ul>
                        {dones.map((item) =>
                            <li key={Math.random(dones.length)}>
                                <div className={styles.item}>{item}</div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {
                resp !== 0?
                <Alert status={resp} token="" action={action}/>:
                null
            }   
        </div>
    )
}

export default Todos;