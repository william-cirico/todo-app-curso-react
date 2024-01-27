import { useEffect, useRef, useState } from "react";
import { Todo } from "../types/todo";
import { useTodo } from "../contexts/TodoContext";

type Props = {
    todo: Todo;
}

function Item({ todo }: Props) {
    const { removeTodo, toggleTodo, editTodo } = useTodo();

    const [isInEditMode, setIsInEditMode] = useState(false)
    const [editText, setEditText] = useState(todo.name)

    const onCancelEdit = () => {
        setEditText(todo.name)
        setIsInEditMode(false)
    }

    const onSaveEdit = () => {
        editTodo({
            ...todo,
            name: editText,
        })
        setIsInEditMode(false)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSaveEdit()
        }
    }

    useEffect(() => {
        if (isInEditMode) {
            editInputRef.current.focus()
        }
    }, [isInEditMode])

    const editInputRef = useRef<HTMLInputElement>(null!)

    if (isInEditMode) {
        return (
            <li className="list-group-item d-flex align-items-center">
                <div className="form-check flex-grow-1 d-flex align-items-center gap-2 pe-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="activeCheckbox"
                        checked={todo.isCompleted}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <input
                        ref={editInputRef}
                        type="text" 
                        className="form-control" 
                        onChange={e => setEditText(e.target.value)} 
                        value={editText}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className="d-flex gap-1">
                    <button onClick={onSaveEdit} className="btn btn-success btn-sm">
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button onClick={onCancelEdit} className="btn btn-danger btn-sm">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            </li>
        )
    }

    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="form-check flex-grow-1">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="activeCheckbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                />
                <label
                    htmlFor="activeCheckbox"
                    className={`form-check-label ${todo.isCompleted ? 'text-decoration-line-through' : ''}`}
                >
                    {todo.name}
                </label>
            </div>
            <div className="d-flex gap-1">
                <button onClick={() => setIsInEditMode(true)} className="btn btn-warning btn-sm">
                    <i className="bi bi-pencil"></i>
                </button>
                <button onClick={() => removeTodo(todo.id)} className="btn btn-danger btn-sm">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </li>
    )
}

export default Item