import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Todo from "../components/Todo";
import Alert from "../components/Alert";

const Title = styled.h1`
    text-align: center;
`;

const Wrapper = styled.div`
    width: 100vw;
    &:after{
        content: "";
        display: block;
        clear: both;
    }
`;

const Box = styled.div`
    float: left;
    margin: 2%;
    width: 42%;
    padding: 2%;
    box-shadow: 0px 3px 5px 3px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
    width: 100%;
    padding: 10px 0;
`;

const TodosInput = styled.input`
    width: 80%;
    height: 50px;
`;

const SubmitBtn = styled.button`
    margin-left: 3%;
    width: 15%;
    height: 50px;
    background-color: blueviolet;
    border: none;
    color: white;
`;

const Item = styled.div`
    width: 50%;
    text-indent: 20px;
    line-height: 50px;
`;

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [dones, setDones] = useState([]);
    const [action, setAction] = useState("");
    const [resp, setResp] = useState(0);
    const location = useLocation();
    const token = "1234";
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
            <Title>TODOS</Title>
            <Wrapper>
                <Box>
                    <Title as="h2">할일</Title>
                    <Content>
                        <TodosInput
                            value={todo} 
                            onChange={handleChangeTodo} 
                            type="text" 
                            placeholder="할일을 입력해주세요."
                        />
                        <SubmitBtn onClick={event => addTodo(event)}>
                            추가
                        </SubmitBtn>
                    </Content>
                    <Content>
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
                    </Content>
                </Box>
                <Box>
                    <Title as="h2">완료한 일</Title>
                    <Content>
                        <ul>
                            {dones.map((item) =>
                                <li key={Math.random(dones.length)}>
                                    <Item>{item}</Item>
                                </li>
                            )}
                        </ul>
                    </Content>
                </Box>
            </Wrapper>
            {
                resp !== 0?
                <Alert status={resp} token="" action={action}/>:
                null
            }   
        </div>
    )
}

export default Todos;