import { useTodo } from "../contexts/TodoContext"

function Header() {
    const { quantity } = useTodo()

    return (
        <div className="card-header">
            Tarefas ({quantity})
        </div>
    )
}

export default Header