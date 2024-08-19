import { Todo } from "../../types/Todo";

// Delete Todo API
export async function deleteTodo(id: string) {
  // Local storage is just being used as a temporary storage solution
  if (!window.localStorage) return [];
  const todosString = window.localStorage.getItem("todos");

  if (!todosString) return [];

  const todos: Todo[] = JSON.parse(todosString);

  const updatedTodos = todos.filter((todo) => todo.id !== id);

  window.localStorage.setItem("todos", JSON.stringify(updatedTodos));

  return updatedTodos;
}
