import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

const Box = styled.li`
    width: 100%;
    margin-top: 10px;
    padding: 20px 0;
    box-shadow: 0px 3px 5px 3px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const TodoInput = styled.input`
    margin: 0 2%;
    width: 100%;
    height: 50px;
`;

const TodoItem = styled.div`
    margin: 0 2%;
    width: 56%;
    text-indent: 20px;
    line-height: 50px;
`;

const BtnBox = styled.div`
    margin: 0 2%;
    width: 36%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const EditBtn = styled.button`
    width: 70px;
    height: 50px;
    margin-left: 5%;
    background-color: ${(prop) => prop.bgColor};
    border: none;
    color: white;
`

const Todo = ({id, todo, updateTodoState, updateTodoContent, deleteTodo}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedTodo, setModifiedTodo] = useState("");

    const handleChangeTodo = (event) => {
        setModifiedTodo(event.target.value);
    }

    const setUpdateTodo = (e, {state}) => {
        e.preventDefault();
        setIsEditing(state);
    }

    const handleUpdateTodo = (e, {id}) => {
        e.preventDefault();
        updateTodoContent(e, {id: id, todo: modifiedTodo});
        setIsEditing(false);
    }

    return (
        <Box>
            {
                isEditing?
                <Content>
                    <TodoInput
                        value={modifiedTodo}
                        onChange={handleChangeTodo}
                        type="text"
                        placeholder={todo}
                    />
                    <BtnBox>
                        <EditBtn
                            bgColor="dodgerblue"
                            onClick={event => handleUpdateTodo(event, {id: id})}
                        >
                            제출
                        </EditBtn>
                        <EditBtn
                            bgColor="tomato"
                            onClick={event => setUpdateTodo(event, {state: false})}
                        >
                            취소
                        </EditBtn>
                    </BtnBox>
                </Content>:
                <Content>
                    <TodoItem>{todo}</TodoItem>
                    <BtnBox>
                        <EditBtn 
                            bgColor="dodgerblue"
                            onClick={event => updateTodoState(event, {id: id, todo: todo})}
                            disabled={isEditing}
                        >
                            완료하기
                        </EditBtn>
                        <EditBtn
                            bgColor="darkorange" 
                            onClick={event => setUpdateTodo(event, {state: true})}
                        >
                            수정
                        </EditBtn>
                        <EditBtn
                            bgColor="tomato"
                            onClick={event => deleteTodo(event, {id: id})}
                            disabled={isEditing}
                        >
                            삭제
                        </EditBtn>
                    </BtnBox>
                </Content>
            }
        </Box>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
}

export default Todo;