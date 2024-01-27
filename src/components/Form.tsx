import React, { useState } from "react"
import { useTodo } from "../contexts/TodoContext"

function Form() {
    const { addTodo } = useTodo()

    const [name, setName] = useState("")
    const [hasError, setHasError] = useState(false)

    const onAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Evitar que a página recarregue

        // "  a  ".trim() -> "a"
        // !"    " -> True
        if (!name.trim()) {
            setHasError(true)
            return
        }

        addTodo(name)
        setName("")
        setHasError(false)
    }

    return (
        <form onSubmit={onAddTodo} className="input-group mb-3">
            <input
                placeholder="Digite o nome da tarefa..."
                type="text"
                className={`form-control ${hasError ? 'is-invalid' : ''}`}
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <button className="btn btn-primary">Cadastrar</button>
            <div className="invalid-feedback">
                Por favor, informe um nome válido para a tarefa
            </div>
        </form>
    )
}

export default Form