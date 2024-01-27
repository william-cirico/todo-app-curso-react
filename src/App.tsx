import "./App.css"
import Form from "./components/Form"
import Header from "./components/Header"
import List from "./components/List"
import TodoProvider from "./contexts/TodoContext"

function App() {
  return (
    <TodoProvider>
      <div className="container">
        <h1 className="text-center">App de Tarefas</h1>
        <div className="card">
          <Header />
          <div className="card-body">
            <Form />
            <List />
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
