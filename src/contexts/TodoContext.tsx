import { ReactNode, createContext, useState, useContext } from "react";
import { Todo } from "../types/todo"

type TodoContextType = {
    todos: Todo[];
    quantity: number;
    addTodo: (name: string) => void;
    editTodo: (todo: Todo) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType>(null!)

function TodoProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, name: "Tarefa criada no contexto...", isCompleted: false }
    ])

    const addTodo = (name: string) => {
        const newTodo: Todo = {
            id: (todos[todos.length - 1]?.id ?? 0) + 1,
            name,
            isCompleted: false
        }

        /*
        ...todos vai jogar para dentro do vetor todas as tarefas já criadas
        */
        setTodos([...todos, newTodo])
    }

    const editTodo = (todo: Todo) => {
        const updatedTodos = todos.map(t => {
            if (t.id === todo.id) {
                t.name = todo.name
            }

            return t
        })
        
        setTodos(updatedTodos)
    }

    const toggleTodo = (id: number) => {
        const updatedTodos = todos.map(t => {
            if (t.id === id) {
                t.isCompleted = !t.isCompleted
            }

            return t
        })

        setTodos(updatedTodos)
    }

    const removeTodo = (id: number) => {
        const updatedTodos = todos.filter(t => t.id !== id)

        setTodos(updatedTodos)
    }

    const quantity = todos.length;

    return (
        <TodoContext.Provider value={{
            todos,
            quantity,
            addTodo,
            editTodo,
            toggleTodo,
            removeTodo,
        }}>
            { children }
        </TodoContext.Provider>
    )
}

export default TodoProvider

export const useTodo = () => useContext(TodoContext);