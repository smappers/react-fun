import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { createTodo } from "../api/create-todo";
import { getTodos } from "../api/get-todos";
import type { Todo } from "../../types/Todo";
import { deleteTodo } from "../api/delete-todo";
import { updateTodo } from "../api/update-todo";

function TodoList() {
  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  const listItems = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      text={todo.text}
      completed={todo.completed}
      onChange={() => handleOnChange(todo.id)}
      deleteItem={() => handleDelete(todo.id)}
    />
  ));

  async function handleOnChange(id: string) {
    // toggle the completed state of the todo item
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (!updatedTodo) return;
    updatedTodo.completed = !updatedTodo.completed;
    // update the todo item in the list
    const updatedTodos = await updateTodo(id, updatedTodo);
    // update the todos state
    setTodos(updatedTodos);
  }

  async function handleDelete(id: string) {
    // remove the todo item from the list
    const updatedTodos = await deleteTodo(id);
    // update the todos state
    setTodos(updatedTodos);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    // add a new todo item to the list
    const updatedTodos = await createTodo(newTodoText);
    // update the todos state
    setTodos(updatedTodos);
    setNewTodoText("");
  }

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            onChange={(e) => setNewTodoText(e.target.value)}
            value={newTodoText}
          />
          <button>Add</button>
        </form>
      </div>
      {listItems}
    </div>
  );
}

export default TodoList;
