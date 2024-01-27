import { useTodo } from "../contexts/TodoContext"
import Item from "./Item"

function List() {
    const { todos } = useTodo();

    return (
        <ul className="list-group">
            { todos.map(todo => <Item key={todo.id} todo={todo} />) }
        </ul>
    )
}

export default List