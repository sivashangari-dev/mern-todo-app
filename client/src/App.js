import { useEffect, useState } from "react";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
        { method: "GET" },
      );

      const todos = await response.json();

      setTodos(todos);
    };

    getTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault(); //prevent page refresh on submiting form

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
      {
        method: "POST",
        headers: {
          //tells the server what type of data you're sending in the request
          "Content-type": "application/json",
        },
        body: JSON.stringify({ todo: name }), //convert the data to JSON format
      },
    );

    const newTodo = await response.json();

    setName("");
    setTodos([...todos, newTodo]);
  };

  

  return (
    <div className="container">
      <h1 className="title">Task manager</h1>

      <form className="form" onSubmit={createTodo}>
        <input
          type="text"
          className="form__input"
          placeholder="Add a new Todo..."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="todo-add-button">
          Create Todo
        </button>
      </form>

      <Todo todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
