import { RiDeleteBin5Fill } from "react-icons/ri";

const Todo = (props) => {
  const todos = props.todos;
  const setTodos = props.setTodos;

  const deleteTodo = async (todoId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,

      {
        method: "DELETE",
      },
    );

    if (!response.ok) return;

    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
  };

  const updateTodo = async (todoId, status) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,

      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status: !status }),
      },
    );

    const updatedTodo = await response.json();

    setTodos((prev) =>
      prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
    );
  };

  return (
    <div className="todos">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div className="todo" key={todo._id}>
            <p>{todo.todo}</p>

            <div className="mutations">
              <input
                type="checkbox"
                checked={todo.status}
                className="todo__status"
                onChange={() => updateTodo(todo._id, todo.status)}
              />

              <RiDeleteBin5Fill
                className="todo__delete"
                onClick={() => deleteTodo(todo._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <h1>No Todos Available</h1>
      )}
    </div>
  );
};

export default Todo;
