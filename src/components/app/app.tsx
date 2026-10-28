import { ThemeSwitcher } from '../themeSwitcher/themeSwitcher'
import { TodoApp } from '../todoApp/todoApp'

function App() {
 
  return (
    <div className="app">
      <ThemeSwitcher/>
      <TodoApp/>
    </div>
  )
}

export default App