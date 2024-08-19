import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { createTodo } from "../api/create-todo";
import { getTodos } from "../api/get-todos";
import type { Todo } from "../../types/Todo";
import { deleteTodo } from "../api/delete-todo";
import { updateTodo } from "../api/update-todo";
import "./TodoList.css";

function TodoList() {
  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoEffort, setNewTodoEffort] = useState<Todo["effort"] | "">("");

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
    if (!newTodoText) return;
    if (!newTodoEffort) return;
    // add a new todo item to the list
    const updatedTodos = await createTodo(newTodoText);
    // update the todos state
    setTodos(updatedTodos);
    setNewTodoText("");
    setNewTodoEffort("");
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div>
        <form onSubmit={handleAdd}>
          <input
            className="todo-list__input"
            type="text"
            onChange={(e) => setNewTodoText(e.target.value)}
            value={newTodoText}
          />
          <select
            onChange={(e) =>
              setNewTodoEffort(e.target.value as Todo["effort"] | "")
            }
            className="todo-list__effort-select"
            value={newTodoEffort}
          >
            <option value="">Select Effort</option>
            <option value="xs">Extra Small</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
            <option value="xl">Extra Large</option>
          </select>
          <button className="todo-list__button">Add</button>
        </form>
      </div>
      <div className="todo-list__items">{listItems}</div>
    </div>
  );
}

export default TodoList;
