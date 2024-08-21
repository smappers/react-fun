import { useEffect, useState } from "react";
import type { Todo } from "@/types/Todo";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "@/features/todo/api";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import TodoForm from "./TodoForm";

const FILTER_MAP = {
  All: () => true,
  Active: (todo: Todo) => !todo.completed,
  Completed: (todo: Todo) => todo.completed,
};

function TodoList() {
  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<keyof typeof FILTER_MAP>("All");

  const filteredTodos = todos.filter(FILTER_MAP[filter]);

  const listItems = filteredTodos.map((todo) => (
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

  async function addTodo(newTodoText: string, newTodoEffort: Todo["effort"]) {
    // add a new todo item to the list
    const updatedTodos = await createTodo(newTodoText, newTodoEffort);
    // update the todos state
    setTodos(updatedTodos);
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div>
        <TodoForm onSubmit={addTodo} />
      </div>
      <div>
        <button className="todo-list__button" onClick={() => setFilter("All")}>
          All
        </button>
        <button
          className="todo-list__button"
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className="todo-list__button"
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="todo-list__items">{listItems}</div>
    </div>
  );
}

export default TodoList;
