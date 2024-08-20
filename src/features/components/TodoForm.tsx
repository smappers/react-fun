import type { Todo } from "../../types/Todo";
import { useState } from "react";
import "./TodoForm.css";

function TodoForm({
  onSubmit,
}: {
  onSubmit: (todoText: string, todoEffort: Todo["effort"]) => void;
}) {
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoEffort, setNewTodoEffort] = useState<Todo["effort"] | "">("");

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodoText || !newTodoEffort) return;
    onSubmit(newTodoText, newTodoEffort);
    setNewTodoText("");
    setNewTodoEffort("");
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
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
    </>
  );
}

export default TodoForm;
