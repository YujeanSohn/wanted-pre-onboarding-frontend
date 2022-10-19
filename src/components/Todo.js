import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './Todo.module.css';

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
        <li>
            {
                isEditing?
                <div className={styles.content}>
                    <input
                        className={styles.edit_input}
                        value={modifiedTodo}
                        onChange={handleChangeTodo}
                        type="text"
                        placeholder={todo}
                    />
                    <div className={styles.edit_btn_wrapper}>
                        <button 
                            className={styles.edit_btn} 
                            onClick={event => handleUpdateTodo(event, {id: id})}
                        >
                            제출
                        </button>
                        <button
                            className={styles.edit_btn}
                            onClick={event => setUpdateTodo(event, {state: false})}
                        >
                            취소
                        </button>
                    </div>
                </div>:
                <div className={styles.content}>
                    <div className={styles.item}>{todo}</div>
                    <div className={styles.edit_btn_wrapper}>
                        <button 
                            className={styles.edit_btn} 
                            onClick={event => updateTodoState(event, {id: id, todo: todo})}
                            disabled={isEditing}
                        >
                            완료
                        </button>
                        <button 
                            className={styles.edit_btn} 
                            onClick={event => setUpdateTodo(event, {state: true})}
                        >
                            수정
                        </button>
                        <button 
                            className={styles.edit_btn} 
                            onClick={event => deleteTodo(event, {id: id})}
                            disabled={isEditing}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            }
        </li>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
}

export default Todo;